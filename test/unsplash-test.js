import Unsplash from "../src/unsplash.js";
import expect, { spyOn, restoreSpies } from "expect";
import { bodyToFormData } from "../src/utils";

const applicationId = "applicationId";
const secret = "secret";
const callbackUrl = "http://foo.com"

describe("Unsplash", () => {
  describe("constructor", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    it("should successfully construct an Unsplash instance", () => {
      expect(unsplash).toBeAn(Unsplash);
    });

    it("should set an apiUrl on the Unsplash instance", () => {
      expect(unsplash._apiUrl).toBe("https://api.unsplash.com");
    });

    it("should set the applicationId argument on the Unsplash instance", () => {
      expect(unsplash._applicationId).toBe(applicationId);
    });

    it("should set the secret argument on the Unsplash instance", () => {
      expect(unsplash._secret).toBe(secret);
    });


    it("should set the callbackUrl argument on the Unsplash instance", () => {
      expect(unsplash._callbackUrl).toBe(callbackUrl);
    });

    it("should have an auth method", () => {
      expect(unsplash.auth).toExist();
    });

    it("should have a currentUser method", () => {
      expect(unsplash.currentUser).toExist();
    });

    it("should have a users method", () => {
      expect(unsplash.users).toExist();
    });

    it("should have a photos method", () => {
      expect(unsplash.photos).toExist();
    });

    it("should have a categories method", () => {
      expect(unsplash.categories).toExist();
    });

    it("should have a curatedBatches method", () => {
      expect(unsplash.curatedBatches).toExist();
    });

    it("should have a stats method", () => {
      expect(unsplash.stats).toExist();
    });

    it("should have a setBearerToken method", () => {
      expect(unsplash.setBearerToken).toExist();
    });
  });

  describe("auth", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    describe("getAuthenticationUrl", () => {
      it("should return an authentication url", () => {
        expect(unsplash.auth.getAuthenticationUrl(
          ["public", "read_user"]
        ))
        .toBe([
          "https://unsplash.com/oauth/authorize",
          `?client_id=${applicationId}`,
          "&redirect_uri=http://foo.com",
          "&response_type=code",
          "&scope=public+read_user"
        ].join(""));
      });

      it("should default to public scope when no scope array is passed", () => {
        expect(unsplash.auth.getAuthenticationUrl())
        .toBe([
          "https://unsplash.com/oauth/authorize",
          `?client_id=${applicationId}`,
          "&redirect_uri=http://foo.com",
          "&response_type=code",
          "&scope=public"
        ].join(""));
      });
    });

    describe("userAuthentication", () => {
      it("should make a POST request to /oauth/token", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.auth.userAuthentication("oauth_code");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          url: "https://unsplash.com/oauth/token",
          method: "POST",
          body: {
            client_id: "applicationId",
            client_secret: "secret",
            redirect_uri: "http://foo.com",
            code: "oauth_code",
            grant_type: "authorization_code"
          },
          oauth: true
        }]);

        restoreSpies();
      });
    });
  });

  describe("currentUser", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    it("should make a GET request to /me", () => {
      let spy = spyOn(unsplash, "request");
      unsplash.currentUser();

      expect(spy.calls.length).toEqual(1);
      expect(spy.calls[0].arguments).toEqual([{
        method: "GET",
        url: "/me"
      }]);
    });
  });

  describe("users", () => {
    afterEach(function () {
      restoreSpies();
    });

    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    describe("profile", () => {
      it("should make a GET request to /users/{username}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.users.profile("naoufal");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal"
        }]);
      });
    });

    describe("photos", () => {
      it("should make a GET request to /users/{username}/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.users.photos("naoufal");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal/photos"
        }]);
      });
    });

    describe("likes", () => {
      it("should make a GET request to /users/{username}/likes", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.users.likes("naoufal");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal/likes",
          query: {
            page: undefined,
            per_page: undefined
          }
        }]);
      });
    });
  });

  describe("photos", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    afterEach(function () {
      restoreSpies();
    });

    describe("listPhotos", () => {
      it("should make a GET request to /photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.listPhotos(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("searchPhotos", () => {
      it("should make a GET request to /photos/search", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.searchPhotos("cats", [11, 4, 88], 2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/search",
          query: {
            query: "cats",
            category: "11,4,88",
            page: 2,
            per_page: 15
          }
        }]);
      });

      it("should default to empty cateogory when no category array is passed", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.searchPhotos("cats", undefined, 2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/search",
          query: {
            query: "cats",
            category: "",
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("getPhoto", () => {
      it("should make a GET request to /photos/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.getPhoto(88, 1920, 1080);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/88",
          query: {
            w: 1920,
            h: 1080,
            rect: undefined
          }
        }]);
      });
    });

    describe("getRandomPhoto", () => {
      it("should make a GET request to /photos/random", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.getRandomPhoto();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/random",
          query: {
            category: undefined,
            featured: undefined,
            username: undefined,
            query: undefined,
            w: undefined,
            h: undefined
          }
        }]);
      });
    });

    describe("uploadPhoto", () => {
      let unsplash = new Unsplash({
        applicationId,
        secret,
        callbackUrl
      });

      it("should throw is bearerToken when not set", () => {
        expect(unsplash.photos.uploadPhoto.bind(null, "photo"))
          .toThrow(/Requires a bearerToken to be set./);
      });

      it("should make a POST request to /photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.setBearerToken("foo");
        unsplash.photos.uploadPhoto("photo.jpg");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "POST",
          url: "/photos",
          body: {
            photo: "photo.jpg"
          }
        }]);
      });
    });

    describe("likePhoto", () => {
      let unsplash = new Unsplash({
        applicationId,
        secret,
        callbackUrl
      });

      it("should throw is bearerToken when not set", () => {
        expect(unsplash.photos.likePhoto.bind(null, 88))
          .toThrow(/Requires a bearerToken to be set./);
      });

      it("should make a POST request to /photos/{id}/like", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.setBearerToken("foo");
        unsplash.photos.likePhoto(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "POST",
          url: "/photos/88/like"
        }]);
      });
    });

    describe("unlikePhoto", () => {
      let unsplash = new Unsplash({
        applicationId,
        secret,
        callbackUrl
      });

      it("should throw is bearerToken when not set", () => {
        expect(unsplash.photos.unlikePhoto.bind(null, 88))
          .toThrow(/Requires a bearerToken to be set./);
      });

      it("should make a DELETE request to /photos/{id}/like", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.setBearerToken("foo");
        unsplash.photos.unlikePhoto(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "DELETE",
          url: "/photos/88/like"
        }]);
      });
    });
  });

  describe("categories", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    afterEach(function () {
      restoreSpies();
    });

    describe("listCategories", () => {
      it("should make a GET request to /categories", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.categories.listCategories();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/categories"
        }]);
      });
    });

    describe("category", () => {
      it("should make a GET request to /categories/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.categories.category(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/categories/88"
        }]);
      });
    });

    describe("categoryPhotos", () => {
      it("should make a GET request to /categories/{id}/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.categories.categoryPhotos(88, 2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/categories/88/photos",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });
  });

  describe("curatedBatches", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    afterEach(function () {
      restoreSpies();
    });

    describe("listCuratedBatches", () => {
      it("should make a GET request to /curated_batches", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.curatedBatches.listCuratedBatches(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/curated_batches",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("curatedBatch", () => {
      it("should make a GET request to /curated_batches/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.curatedBatches.curatedBatch(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/curated_batches/88",
        }]);
      });
    });

    describe("curatedBatchPhotos", () => {
      it("should make a GET request to /curated_batches/{id}/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.curatedBatches.curatedBatchPhotos(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/curated_batches/88/photos",
        }]);
      });
    });
  });

  describe("stats", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    describe("total", () => {
      it("should make a GET request to /stats", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.stats.total();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/stats",
        }]);
      });
    });
  });

  describe("setBearerToken", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    it("should set _bearerToken", () => {
      unsplash.setBearerToken("bar");
      expect(unsplash._bearerToken).toBe("bar");
    });
  });

  describe("utils", () => {
    describe("bodyToFormData", () => {
      it("should return form data", () => {
        expect(bodyToFormData({ foo: "bar" }))
        .toBeAn(Object);
      });
    });
  });
});