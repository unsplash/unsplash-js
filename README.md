# Unsplash

[![npm](https://img.shields.io/npm/v/unsplash-js.svg?style=flat-square)](https://www.npmjs.com/package/unsplash-js)

Official JavaScript wrapper for the [Unsplash API](https://unsplash.com/developers).

Key Links:

- Before using the Unsplash API, [register as a developer](https://unsplash.com/developers).
- Before using the Unsplash API, read the [API Guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines). Specifically, you _must_:
  - [hotlink images](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-hotlinking-images)
  - [attribute photographers](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-attribution)
  - [trigger a download when appropriate](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-triggering-a-download)

## Documentation

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Types](#types)
- [Instance Methods](#instance-methods)

## Installation

```bash
$ npm i --save unsplash-js

# OR

$ yarn add unsplash-js
```

## Dependencies

### Fetch

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Unsplash API. For environments that don't support fetch, you'll need to provide polyfills of your choosing. Here are the ones we recommend:

- node implementation: [node-fetch](https://github.com/bitinn/node-fetch)
- browser polyfill: [whatwg-fetch](https://github.com/github/fetch)

#### Adding polyfills

`createApi` receives an optional `fetch` parameter. When it is not provided, we rely on the globally scoped `fetch`.

This means that you can set the polyfills in the global scope:

```ts
// server
import fetch from "node-fetch";
global.fetch = fetch;

// browser
import "whatwg-fetch";
```

or explicitly provide them as an argument:

```ts
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: "MY_ACCESS_KEY",
  fetch: nodeFetch,
});
```

## Usage

### Creating an instance

To create an instance, simply provide an _Object_ with your `accessKey`.

NOTE: If you're using `unsplash-js` publicly in the browser, you'll need to proxy your requests through your server to sign the requests with the Access Key to abide by the [API Guideline](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) to keep keys confidential. We provide an `baseUrl` property that lets you do so. You should only need to provide _one_ of those two values in any given scenario.

```ts
import { createApi } from "unsplash-js";

// on your node server
const serverApi = createApi({
  accessKey: "MY_ACCESS_KEY",
  //...other fetch options
});

// in the browser
const browserApi = createApi({
  baseUrl: "https://mywebsite.com/unsplash-proxy",
  //...other fetch options
});
```

### Making a request

#### Arguments

All methods expect an object argument containing a `params` property and the usual fetch options. On top of that, the `createApi` constructor can receive default `fetch` options to be added to _every_ request:

```ts
const unsplash = createApi({
  accessKey: "MY_ACCESS_KEY",
  // `fetch` options to be sent with every request
  headers: { "X-Custom-Header": "foo" },
});

unsplash.GET("/photos/{assetSlug}", {
  params: { path: { assetSlug: "123" } },
  // `fetch` options to be sent only with _this_ request
  headers: { "X-Custom-Header-2": "bar" },
});
```

Example: if you would like to implement [request abortion](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), you can do so like this:

```ts
const unsplash = createApi({
  accessKey: "MY_ACCESS_KEY",
});

const controller = new AbortController();
const signal = controller.signal;

unsplash
  .GET("/photos/{assetSlug}", {
    params: { path: { assetSlug: "123" } },
    signal,
  })
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    }
  });

controller.abort();
```

#### Response

When making a request using this SDK, there are 2 non-exceptional outcomes to a request: either an error or data was received. both situations can be checked by testing for the existence of `result.error` and `result.data` respectively. In both cases the raw response is available under `result.response` which can be useful to get the `X-Total` value on feed responses.

```ts
const unsplash = createApi({ accessKey: "MY_ACCESS_KEY" });

// non-feed example
const result = await unsplash.GET("/photos/{assetSlug}", {
  params: { path: { assetSlug: "foo" } },
});

if (result.error) {
  // handle error here
  console.log("error occurred: ", result.error.errors[0]);
} else {
  // handle success here
  const photo = result.data;
  console.log(photo);
}

// feed example
const result = await unsplash.GET("/users/{username}/photos", {
  params: { path: { username: "foo" } },
});

if (result.error) {
  // handle error here
  console.log("error occurred: ", result.error.errors[0]);
} else {
  // extract total and results array from response
  const feed = result.data;
  const total = parseInt(result.response.headers.get("x-total"));

  // handle success here
  console.log(`received ${feed.length} photos out of ${total}`);
  console.log("first photo: ", feed[0]);
}
```

#### Authentication

This library exposes an optional `accessKey` parameter on the `createApi` constructor that will configure the default `Authorizaton` header for the [public authentication](https://unsplash.com/documentation#public-authentication) scheme.

If you need to use either the [user authentication](https://unsplash.com/documentation#user-authentication) or [dynamic client registration](https://unsplash.com/documentation#dynamic-client-registration) scheme, set the `Authorization` header on each request according to the corresponding protocol.

## Types

The types for this library target TypeScript v4.5 and above.

This library is written in TypeScript. This means that even if you are writing plain JavaScript, you can still get useful and accurate type information. We highly recommend that you setup your environment (using an IDE such as [VSCode](https://code.visualstudio.com/)) to fully benefit from this information:

### Request completion

![](./vscode-path-completion.png)
![](./vscode-params-completion-1.png)
![](./vscode-params-completion-2.png)

### Response completion

![](./vscode-response-completion.png)

## Endpoint examples

`createApi` returns a preconfigured [`openapi-fetch`](https://openapi-ts.dev/openapi-fetch/) client whose methods corresponds to the usual HTTP verbs.
All [publicly documented endpoints](https://unsplash.com/documentation) are available. Endpoints are grouped under the following categories:

- [Search](https://github.com/unsplash/unsplash-js#search)
- [Photos](https://github.com/unsplash/unsplash-js#photos)
- [Users](https://github.com/unsplash/unsplash-js#users)
- [Collections](https://github.com/unsplash/unsplash-js#collections)
- [Topics](https://github.com/unsplash/unsplash-js#topics)

For any undocumented endpoint, [the OpenAPI spec](https://editor.swagger.io/?url=https://unsplash.com/spec/v1.json) should fill in the gaps.

---

<div id="search" />

<div id="search-photos" />

### `.GET("/search/photos", { params: { ... }})`

Get a list of photos matching the query. [See endpoint docs 🚀](https://unsplash.com/documentation#search-photos)

**Parameters**

| Parameter            | Location | Type                                      | Optional/Required | Default    | Note                                                       |
| -------------------- | -------- | ----------------------------------------- | ----------------- | ---------- | ---------------------------------------------------------- |
| **`query`**          | query    | _string_                                  | Required          |            |                                                            |
| **`page`**           | query    | _number_                                  | Optional          | 1          |                                                            |
| **`per_page`**       | query    | _number_                                  | Optional          | 10         |                                                            |
| **`orientation`**    | query    | _"portrait" \| "landscape" \| "squarish"_ | Optional          |            |                                                            |
| **`content_filter`** | query    | _"low" \| "high"_                         | Optional          | "low"      |                                                            |
| **`color`**          | query    | _string_                                  | Optional          |            | see https://unsplash.com/documentation#search-photos       |
| **`order_by`**       | query    | _"latest" \| "relevant"_                  | Optional          | "relevant" |                                                            |
| **`collections`**    | query    | _Array<string>_                           | Optional          |            |                                                            |
| **`lang`**           | query    | _string_                                  | Optional          | "en"       | see https://unsplash.com/documentation#supported-languages |

**Example**

```ts
const { data, error } = await unsplash.GET("/search/photos", {
  params: {
    query: {
      query: "cat",
      page: 1,
      per_page: 10,
      color: "green",
      orientation: "portrait",
    },
  },
});
```

### `.GET("/search/users", { params: { ... }})`

Get a list of users matching the query. [See endpoint docs 🚀](https://unsplash.com/documentation#search-users)

**Parameters**

| Parameter      | Location | Type     | Optional/Required | Default |
| -------------- | -------- | -------- | ----------------- | ------- |
| **`query`**    | query    | _string_ | Required          |         |
| **`page`**     | query    | _number_ | Optional          | 1       |
| **`per_page`** | query    | _number_ | Optional          | 10      |

**Example**

```ts
const { data, error } = await unsplash.GET("/search/users", {
  params: {
    query: {
      query: "cat",
      page: 1,
      per_page: 10,
    },
  },
});
```

### `.GET("/search/collections", { params: { ... }})`

Get a list of collections matching the query. [See endpoint docs 🚀](https://unsplash.com/documentation#search-collections)

**Parameters**

| Parameter      | Location | Type     | Optional/Required | Default |
| -------------- | -------- | -------- | ----------------- | ------- |
| **`query`**    | query    | _string_ | Required          |         |
| **`page`**     | query    | _number_ | Optional          | 1       |
| **`per_page`** | query    | _number_ | Optional          | 10      |

**Example**

```ts
const { data, error } = await unsplash.GET("/search/collections", {
  params: {
    query: {
      query: "cat",
      page: 1,
      per_page: 10,
    },
  },
});
```

---

<div id="photos" />

<div id="photos-all" />

### `.GET("/photos", { params: { ... }})`

Get a single page from the list of all photos. [See endpoint docs 🚀](https://unsplash.com/documentation#list-photos)

**Parameters**

| Parameter      | Location | Type     | Optional/Required | Default |
| -------------- | -------- | -------- | ----------------- | ------- |
| **`page`**     | query    | _number_ | Optional          | 1       |
| **`per_page`** | query    | _number_ | Optional          | 10      |

**Example**

```ts
const { data, error } = await unsplash.GET("/photos", {
  params: {
    query: { page: 2, per_page: 15 },
  },
});
```

---

### `.GET("/photos/{assetSlug}", { params: { ... }})`

Retrieve a single photo. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-photo)

**Parameters**

| Parameter       | Location | Type     | Optional/Required |
| --------------- | -------- | -------- | ----------------- |
| **`assetSlug`** | path     | _string_ | Required          |

**Example**

```ts
const { data, error } = await unsplash.GET("/photos/{assetSlug}", {
  params: {
    path: { assetSlug: "mtNweauBsMQ" },
  },
});
```

---

### `.GET("/photos/{assetSlug}/statistics", { params: { ... }})`

Retrieve a single photo's stats. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-photos-statistics)

**Parameters**

| Parameter        | Location | Type     | Optional/Required | Default |
| ---------------- | -------- | -------- | ----------------- | ------- |
| **`assetSlug`**  | path     | _string_ | Required          |         |
| **`resolution`** | query    | _"days"_ | Optional          | "days"  |
| **`quantity`**   | query    | _number_ | Optional          | 30      |

**Example**

```ts
const { data, error } = await unsplash.GET("/photos/{assetSlug}/statistics", {
  params: {
    path: { assetSlug: "mtNweauBsMQ" },
    query: {
      resolution: "days",
      quantity: 30,
    },
  },
});
```

---

<div id="photo-random" />

### `.GET("/photos/random", { params: { ... }})`

Retrieve a single random photo, given optional filters. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-random-photo). Note: if you provide a value for `count` greater than `1`, you will receive an array of photos. Otherwise, you will receive a single photo object.

**Arguments**

| Parameter            | Location | Type                                      | Optional/Required | Default |
| -------------------- | -------- | ----------------------------------------- | ----------------- | ------- |
| **`count`**          | query    | _number_                                  | Optional          | 1       |
| **`collections`**    | query    | _Array<string>_                           | Optional          |         |
| **`topics`**         | query    | _Array<string>_                           | Optional          |         |
| **`username`**       | query    | _string_                                  | Optional          |         |
| **`orientation`**    | query    | _"portrait" \| "landscape" \| "squarish"_ | Optional          |         |
| **`content_filter`** | query    | _"low" \| "high"_                         | Optional          | "low"   |
| **`query`**          | query    | _string_                                  | Optional          |         |

**Example**

```ts
const { data, error } = await unsplash.GET("/photos/random", {
  params: {
    query: {
      collections: ["abc123"],
      topics: ["def456"],
      username: "naoufal",
      query: "dog",
      count: 1,
    },
  },
});
```

<div id="track-download" />

### `.GET("/photos/{id}/download", { params: { ... }})`

Trigger a download of a photo as per the [download tracking requirement of API Guidelines](https://medium.com/unsplash/unsplash-api-guidelines-triggering-a-download-c39b24e99e02). [See endpoint docs 🚀](https://unsplash.com/documentation#track-a-photo-download)

**Arguments**

| Parameter | Location | Type     | Optional/Required |
| --------- | -------- | -------- | ----------------- |
| **`id`**  | path     | _string_ | Required          |

**Example**

```ts
const photoResult = await unsplash.GET("/photos/{assetSlug}", {
  params: {
    path: { assetSlug: "mtNweauBsMQ" },
  },
});

if (photoResult.data) {
  await unsplash.GET("/photos/{id}/download", {
    params: {
      path: { id: photoResult.data.id },
    },
  });
}

// or if working with an array of photos
const searchResult = await unsplash.GET("/search/photos", {
  params: {
    query: { query: "dogs" },
  },
});

if (searchResult.data) {
  const firstPhoto = searchResult.data.results[0];

  await unsplash.GET("/photos/{id}/download", {
    params: {
      path: { id: firstPhoto.id },
    },
  });
}
```

---

<div id="users" />

### `.GET("/users/{username}", { params: { ... }})`

Retrieve public details on a given user. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-users-public-profile)

**Parameters**

| Parameter      | Location | Type     | Optional/Required |
| -------------- | -------- | -------- | ----------------- |
| **`username`** | path     | _string_ | Required          |

**Example**

```ts
const { data, error } = await unsplash.GET("/users/{username}", {
  params: {
    path: { username: "naoufal" },
  },
});
```

---

### `.GET("/users/{username}/photos", { params: { ... }})`

Get a list of photos uploaded by a user. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-users-photos)

**Parameters**

| Parameter         | Location | Type                                                         | Optional/Required | Default  |
| ----------------- | -------- | ------------------------------------------------------------ | ----------------- | -------- |
| **`username`**    | path     | _string_                                                     | Required          |          |
| **`page`**        | query    | _number_                                                     | Optional          | 1        |
| **`per_page`**    | query    | _number_                                                     | Optional          | 10       |
| **`order_by`**    | query    | _"latest" \| "oldest" \| "popular" \| "views" \| "download"_ | Optional          | "latest" |
| **`stats`**       | query    | _boolean_                                                    | Optional          | false    |
| **`resolution`**  | query    | _"days"_                                                     | Optional          | "days"   |
| **`quantity`**    | query    | _number_                                                     | Optional          | 30       |
| **`orientation`** | query    | _"portrait" \| "landscape" \| "squarish"_                    | Optional          |          |

**Example**

```ts
const { data, error } = await unsplash.GET("/users/{username}/photos", {
  params: {
    path: { username: "naoufal" },
    query: {
      page: 1,
      per_page: 10,
      order_by: "latest",
      orientation: "landscape",
    },
  },
});
```

---

### `.GET("/users/{username}/collections", { params: { ... }})`

Get a list of collections created by the user. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-users-collections)

**Parameters**

| Parameter      | Location | Type     | Optional/Required | Default |
| -------------- | -------- | -------- | ----------------- | ------- |
| **`username`** | path     | _string_ | Required          |         |
| **`page`**     | query    | _number_ | Optional          | 1       |
| **`per_page`** | query    | _number_ | Optional          | 10      |

**Example**

```ts
const { data, error } = await unsplash.GET("/users/{username}/collections", {
  params: {
    path: { username: "naoufal" },
    query: {
      page: 2,
      per_page: 15,
    },
  },
});
```

---

<div id="collections" />

### `.GET("/collections", { params: { ... }})`

Get a single page from the list of all collections. [See endpoint docs 🚀](https://unsplash.com/documentation#list-collections)

**Arguments**

| Parameter      | Location | Type     | Optional/Required | Default |
| -------------- | -------- | -------- | ----------------- | ------- |
| **`page`**     | query    | _number_ | Optional          | 1       |
| **`per_page`** | query    | _number_ | Optional          | 10      |

**Example**

```ts
const { data, error } = await unsplash.GET("/collections", {
  params: {
    query: { page: 1, per_page: 10 },
  },
});
```

---

### `.GET("/collections/{collectionId}", { params: { ... }})`

Retrieve a single collection. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-collection)

**Parameters**

| Parameter          | Location | Type     | Optional/Required |
| ------------------ | -------- | -------- | ----------------- |
| **`collectionId`** | path     | _string_ | Required          |

**Example**

```ts
const { data, error } = await unsplash.GET("/collections/{collectionId}", {
  params: {
    path: { collectionId: "abc123" },
  },
});
```

---

### `.GET("/collections/{collectionId}/photos", { params: {}})`

Retrieve a collection’s photos. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-collections-photos)

**Parameters**

| Parameter          | Location | Type                                      | Optional/Required | Default |
| ------------------ | -------- | ----------------------------------------- | ----------------- | ------- |
| **`collectionId`** | path     | _string_                                  | Required          |         |
| **`page`**         | query    | _number_                                  | Optional          | 1       |
| **`per_page`**     | query    | _number_                                  | Optional          | 10      |
| **`orientation`**  | query    | _"portrait" \| "landscape" \| "squarish"_ | Optional          |         |

**Example**

```ts
const { data, error } = await unsplash.GET("/collections/{collectionId}/photos", {
  params: {
    path: { collectionId: "abc123" },
    query: {
      page: 1,
      per_page: 10,
      orientation: "landscape",
    },
  },
});
```

---

### `.GET("/collections/{collectionId}/related", { params: { ... }})`

Lists collections related to the provided one. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-collections-related-collections)

**Parameters**

| Parameter          | Location | Type     | Optional/Required |
| ------------------ | -------- | -------- | ----------------- |
| **`collectionId`** | path     | _string_ | Required          |

**Example**

```ts
const { data, error } = await unsplash.GET("/collections/{collectionId}/related", {
  params: {
    path: { collectionId: "abc123" },
  },
});
```

---

<div id="topics" />

### `.GET("/topics", { params: { ... }})`

Get a single page from the list of all topics. [See endpoint docs 🚀](https://unsplash.com/documentation#list-topics)

**Parameters**

| Parameter      | Location | Type                                               | Optional/Required | Default    |
| -------------- | -------- | -------------------------------------------------- | ----------------- | ---------- |
| **`page`**     | query    | _number_                                           | Optional          | 1          |
| **`per_page`** | query    | _number_                                           | Optional          | 10         |
| **`order_by`** | query    | _"featured" \| "latest" \| "oldest" \| "position"_ | Optional          | "position" |
| **`ids`**      | query    | _Array<string>_                                    | Optional          |            |

**Example**

```ts
const { data, error } = await unsplash.GET("/topics", {
  params: {
    query: {
      page: 1,
      per_page: 10,
      ids: ["fashion", "architecture", "6sMVjTLSkeQ"],
    },
  },
});
```

---

### .GET("/topics/{topicSlug}", { params: { ... }})`

Retrieve a single topic. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-topic)

**Parameters**

| Parameter       | Location | Type     | Optional/Required |
| --------------- | -------- | -------- | ----------------- |
| **`topicSlug`** | path     | _string_ | Required          |

**Example**

```ts
const { data, error } = await unsplash.GET("/topics/{topicSlug}", {
  params: {
    path: { topicSlug: "wallpapers" },
  },
});
```

---

### `.GET("/topics/{topicSlug}/photos", { params: { ... }})`

Retrieve a topic’s photos. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-topics-photos)

**Parameters**

| Parameter         | Location | Type                                      | Optional/Required | Default  |
| ----------------- | -------- | ----------------------------------------- | ----------------- | -------- |
| **`topicSlug`**   | path     | _string_                                  | Required          |          |
| **`page`**        | query    | _number_                                  | Optional          | 1        |
| **`per_page`**    | query    | _number_                                  | Optional          | 10       |
| **`orientation`** | query    | _"portrait" \| "landscape" \| "squarish"_ | Optional          |          |
| **`order_by`**    | query    | _"latest" \| "oldest" \| "popular"_       | Optional          | "latest" |

**Example**

```ts
const { data, error } = await unsplash.GET("/topics/{topicSlug}/photos", {
  params: {
    path: { topicSlug: "wallpapers" },
    query: {
      page: 1,
      per_page: 10,
      order_by: "latest",
      orientation: "landscape",
    },
  },
});
```
