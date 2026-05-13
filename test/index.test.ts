import { expect, it } from "vitest";
import { createApi } from "../dist/index.mjs";

type Fetch = typeof fetch;
/** Intercepts the first fetch call and skips the response path. */
const withInterceptedFetch = async (
  fn: (fetch: Fetch) => Promise<void>,
  assert: (args: Parameters<Fetch>) => void,
) => {
  // Using a non-fungible value help avoid catching unintended values.
  const interceptSentinel = Symbol();
  const fetchInterceptor: Fetch = (...args) => {
    assert(args);
    throw interceptSentinel;
  };
  try {
    await fn(fetchInterceptor);
  } catch (e) {
    if (e !== interceptSentinel) {
      throw e;
    }
  }
};

it("sends the default API base URL and Accept-Version header", async () => {
  const api = createApi();
  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/photos/random", { fetch });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        expect(req.url).toSatisfy((url: string) => url.startsWith("https://api.unsplash.com/"));
        expect(req.headers.get("accept-version")).toBe("v1");
      }
    },
  );
});

it("sends the configured apiVersion as the Accept-Version header", async () => {
  const api = createApi({ apiVersion: "foo" });
  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/me", { fetch });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        expect(req.headers.get("accept-version")).toBe("foo");
      }
    },
  );
});

it("sends requests to the configured baseUrl", async () => {
  const baseUrl = "https://unsplash.example/";
  const api = createApi({ baseUrl });
  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/collections", { fetch });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        expect(req.url).toSatisfy((url: string) => url.startsWith(baseUrl));
      }
    },
  );
});

it("sends accessKey as Client-ID authorization", async () => {
  const api = createApi({ accessKey: "constructor-access-key" });
  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/topics", { fetch });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        expect(req.headers.get("Authorization")).toBe("Client-ID constructor-access-key");
      }
    },
  );
});

it("prefers request Authorization over accessKey authorization", async () => {
  const api = createApi({ accessKey: "constructor-access-key" });
  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/stats/month", {
        headers: {
          Authorization: "Bearer request-token",
        },
        fetch,
      });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        expect(req.headers.get("Authorization")).toBe("Bearer request-token");
      }
    },
  );
});

it("serializes array query parameters as comma-separated values", async () => {
  const api = createApi({ accessKey: "access-key" });

  const collections = ["collection-a", "collection-b"];
  const topics = ["topic-a", "topic-b"];

  await withInterceptedFetch(
    async (fetch) => {
      await api.GET("/photos/random", {
        params: {
          query: { collections, topics },
        },
        fetch,
      });
    },
    ([req, _]) => {
      if (req instanceof URL || typeof req === "string") {
        throw new Error("unexpected intercepted request");
      } else {
        const url = new URL(req.url);
        expect(url.searchParams.get("collections")).toBe(collections.join());
        expect(url.searchParams.get("topics")).toBe(topics.join());
      }
    },
  );
});
