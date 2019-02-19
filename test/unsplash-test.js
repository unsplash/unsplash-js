import Unsplash, { toJson } from "../src/unsplash.js";
import { formUrlEncode, buildFetchOptions } from "../src/utils";

import expect, { spyOn, restoreSpies } from "expect";

const applicationId = "applicationId";
const secret = "secret";
const callbackUrl = "http://foo.com";
const headers = { "X-Custom-Header": "foo" };

describe("Unsplash", () => {
  describe("constructor", () => {
    const unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl,
      headers
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

    it("should set the headers argument on the Unsplash instance", () => {
      expect(unsplash._headers).toBe(headers);
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

    it("should have a collections method", () => {
      expect(unsplash.collections).toExist();
    });

    it("should have a stats method", () => {
      expect(unsplash.stats).toExist();
    });

    it("should overwrite the api url", () => {
      const apiUrl = "http://foo.com";
      const unsplash = new Unsplash({
        applicationId,
        secret,
        apiUrl
      });

      expect(unsplash._apiUrl).toBe(apiUrl);
    });

    it("should overwrite the api version", () => {
      const apiVersion = "v8";
      const unsplash = new Unsplash({
        applicationId,
        secret,
        apiVersion
      });

      expect(unsplash._apiVersion).toBe(apiVersion);
    });
  });

  describe("headers", () => {
    it("should store an empty object if nothing is passed", () => {
      const unsplash = new Unsplash({
        applicationId,
        secret
      });

      expect(unsplash._headers).toEqual({});
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

    describe("setBearerToken", () => {
      let unsplash = new Unsplash({
        applicationId,
        secret,
        callbackUrl
      });

      it("should not set _bearerToken when no `accessToken` argument is passed", () => {
        unsplash.auth.setBearerToken();

        expect(unsplash._bearerToken).toBe(undefined);
      });

      it("should set _bearerToken", () => {
        unsplash.auth.setBearerToken("bar");
        expect(unsplash._bearerToken).toBe("bar");
      });
    });
  });

  describe("currentUser", () => {
    afterEach(function () {
      restoreSpies();
    });

    let unsplash = new Unsplash({
      applicationId,
      secret,
      callbackUrl
    });

    describe("profile", () => {
      it("should make a GET request to /me", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.currentUser.profile();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/me"
        }]);
      });
    });

    describe("updateProfile", () => {
      it("should make a GET request to /me", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.currentUser.updateProfile({
          username: "foo"
        });

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "PUT",
          url: "/me",
          body: {
            username: "foo"
          }
        }]);
      });
    });

  });

  describe("users", () => {
    afterEach(function () {
      restoreSpies();
    });

    let unsplash = new Unsplash({
      applicationId,
      secret
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
        unsplash.users.photos("naoufal", 2, 15, "latest", true);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal/photos",
          query: {
            page: 2,
            per_page: 15,
            order_by: "latest",
            stats: true
          }
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
            page: 1,
            per_page: 10,
            order_by: "latest"
          }
        }]);
      });
    });

    describe("collections", () => {
      it("should make a GET request to /users/{username}/collections", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.users.collections("naoufal");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal/collections",
          query: {
            page: 1,
            per_page: 10,
            order_by: "published"
          }
        }]);
      });
    });

    describe("statistics", () => {
      it("should make a GET request to /users/{username}/statistics", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.users.statistics("naoufal");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/users/naoufal/statistics",
          query: {
            resolution: "days",
            quantity: 30
          }
        }]);
      });
    });
  });

  describe("photos", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret
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
            per_page: 15,
            order_by: "latest"
          }
        }]);
      });
    });

    describe("listCuratedPhotos", () => {
      it("should make a GET request to /photos/curated", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.listCuratedPhotos(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/curated",
          query: {
            page: 2,
            per_page: 15,
            order_by: "latest"
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

    describe("getPhotoStats", () => {
      it("should make a GET request to /photos/{id}/stats", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.photos.getPhotoStats(90);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/90/stats"
        }]);
      });
    });

    describe("getRandomPhoto", () => {
      it("should make a GET request to /photos/random", () => {
        let spy = spyOn(unsplash, "request");
        const cacheBuster = + new Date();
        const collections = [1, 2];

        unsplash.photos.getRandomPhoto({
          collections,
          cacheBuster
        });

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/random",
          query: {
            collections: "1,2",
            c: cacheBuster
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
        unsplash.auth.setBearerToken("foo");
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
        unsplash.auth.setBearerToken("foo");
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
        unsplash.auth.setBearerToken("foo");
        unsplash.photos.unlikePhoto(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "DELETE",
          url: "/photos/88/like"
        }]);
      });
    });

    describe("downloadPhoto", () => {
      it("should make a GET request to the photo's download_location", () => {
        let spy = spyOn(unsplash, "request");
        const mockPhotoResponse = {
          "id": "123123",
          "links": {
            "download_location": "https://api.unsplash.com/photos/123123/download?ixid=drake"
          }
        };

        unsplash.photos.downloadPhoto(mockPhotoResponse);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/photos/123123/download",
          query: {
            ixid: "drake"
          }
        }]);
      });

      it("should throw an error if passed a malformed photo object", () => {
        const mockPhotoResponse = "123123";

        expect(() => unsplash.photos.downloadPhoto(mockPhotoResponse)).toThrow(/Object received is not a photo/);
      });
    });
  });

  describe("categories", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret
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

  describe("collections", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret
    });

    afterEach(function () {
      restoreSpies();
    });

    describe("listCollections", () => {
      it("should make a GET request to /collections", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.listCollections(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("listCuratedCollections", () => {
      it("should make a GET request to /collections/curated", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.listCuratedCollections(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/curated",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("listFeaturedCollections", () => {
      it("should make a GET request to /collections/featured", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.listFeaturedCollections(2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/featured",
          query: {
            page: 2,
            per_page: 15
          }
        }]);
      });
    });

    describe("getCollection", () => {
      it("should make a GET request to /collections/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.getCollection(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/88"
        }]);
      });
    });

    describe("getCuratedCollection", () => {
      it("should make a GET request to /collections/curated/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.getCuratedCollection(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/curated/88"
        }]);
      });
    });

    describe("getCollectionPhotos", () => {
      it("should make a GET request to /collections/{id}/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.getCollectionPhotos(88, 2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/88/photos",
          query: {
            page: 2,
            per_page: 15,
            order_by: "latest"
          }
        }]);
      });
    });

    describe("getCuratedCollectionPhotos", () => {
      it("should make a GET request to /collections/curated/{id}/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.getCuratedCollectionPhotos(88, 2, 15);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/curated/88/photos",
          query: {
            page: 2,
            per_page: 15,
            order_by: "latest"
          }
        }]);
      });
    });

    describe("createCollection", () => {
      it("should make a GET request to /collections", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.createCollection("foo", "bar", true);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "POST",
          url: "/collections",
          body: {
            title: "foo",
            description: "bar",
            private: true
          }
        }]);
      });
    });

    describe("updateCollection", () => {
      it("should make a GET request to /collections/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.updateCollection(88, "foo", "bar", true);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "PUT",
          url: "/collections/88",
          body: {
            title: "foo",
            description: "bar",
            private: true
          }
        }]);
      });
    });

    describe("deleteCollection", () => {
      it("should make a GET request to /collections/{id}", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.deleteCollection(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "DELETE",
          url: "/collections/88"
        }]);
      });
    });

    describe("addPhotoToCollection", () => {
      it("should make a GET request to /collections/{id}/add", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.addPhotoToCollection(88, "abc123");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "POST",
          url: "/collections/88/add",
          body: {
            photo_id: "abc123"
          }
        }]);
      });
    });

    describe("removePhotoToCollection", () => {
      it("should make a GET request to /collections/{id}/remove", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.removePhotoFromCollection(88, "abc123");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "DELETE",
          url: "/collections/88/remove?photo_id=abc123"
        }]);
      });
    });

    describe("listRelatedCollections", () => {
      it("should make a GET request to /collections/{id}/related", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.collections.listRelatedCollections(88);

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/collections/88/related"
        }]);
      });
    });
  });

  describe("stats", () => {
    let unsplash = new Unsplash({
      applicationId,
      secret
    });

    describe("total", () => {
      it("should make a GET request to /stats", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.stats.total();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/stats/total"
        }]);
      });
    });
  });

  describe("search", () => {
    afterEach(function () {
      restoreSpies();
    });

    let unsplash = new Unsplash({
      applicationId,
      secret
    });

    describe("all", () => {
      it("should make a GET request to /search", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.all("dog");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search",
          query: {
            query: "dog",
            page: 1,
            per_page: 10
          }
        }]);
      });

      it("should submit an empty query if the keyword is an empty string", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.all();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search",
          query: {
            query: "",
            page: 1,
            per_page: 10
          }
        }]);
      });
    });

    describe("photos", () => {
      it("should make a GET request to /search/photos", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.photos("nature");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/photos",
          query: {
            query: "nature",
            page: 1,
            per_page: 10
          }
        }]);
      });

      it("should submit an empty query if the keyword is an empty string", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.photos();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/photos",
          query: {
            query: "",
            page: 1,
            per_page: 10
          }
        }]);
      });
    });

    describe("users", () => {
      it("should make a GET request to /search/users", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.users("steve");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/users",
          query: {
            query: "steve",
            page: 1,
            per_page: 10
          }
        }]);
      });

      it("should submit an empty query if the keyword is an empty string", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.users();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/users",
          query: {
            query: "",
            page: 1,
            per_page: 10
          }
        }]);
      });
    });

    describe("collections", () => {
      it("should make a GET request to /search/collections", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.collections("water");

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/collections",
          query: {
            query: "water",
            page: 1,
            per_page: 10
          }
        }]);
      });

      it("should submit an empty query if the keyword is an empty string", () => {
        let spy = spyOn(unsplash, "request");
        unsplash.search.collections();

        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments).toEqual([{
          method: "GET",
          url: "/search/collections",
          query: {
            query: "",
            page: 1,
            per_page: 10
          }
        }]);
      });
    });
  });

  describe("utils", () => {
    describe("formUrlEncode", () => {
      it("should return form data", () => {
        expect(formUrlEncode({ foo: "bar" }))
        .toBe("foo=bar");
      });
    });

    describe("toJson", () => {
      const res = {
        json: () => true
      };

      it("should call the json method on res", () => {
        expect(toJson(res)).toBe(true);
      });

      it("is idempotent", () => {
        const json = toJson(res);
        expect(toJson(json)).toEqual(json);
      });
    });

    describe("buildFetchOptions", () => {
      const classFixture = {
        _apiUrl: "http://foo.com",
        _apiVersion: "v1",
        _applicationId: "bar"
      };

      const optionsFixture = {
        url: "/bar",
        method: "POST",
        query: undefined,
        oauth: false,
        body: undefined
      };

      it("should return a fetchOptions object with a method key representing the method in the options agument", () => {
        let method = buildFetchOptions
          .bind(classFixture)(optionsFixture).options
          .method;

        expect(method).toBe("POST");
      });

      it("should return a fetchOptions object with querystrings appended to the url", () => {
        const options = Object.assign({}, optionsFixture, {
          query: { foo: "bar" }
        });

        let url = buildFetchOptions.bind(classFixture)(options).url;

        expect(url).toBe("http://foo.com/bar?foo=bar");
      });

      it("should return a fetchOptions object with `Client-ID {applicationId}` Authorization header", () => {
        let authorizationHeader = buildFetchOptions
          .bind(classFixture)(optionsFixture).options
          .headers["Authorization"];

        expect(authorizationHeader).toBe("Client-ID bar");
      });

      it("should return a fetchOptions object with `Bearer {token}` Authorization header", () => {
        const classBearerFixture = Object.assign({}, classFixture, {
          _bearerToken: "abc"
        });

        let authorizationHeader = buildFetchOptions
          .bind(classBearerFixture)(optionsFixture).options
          .headers["Authorization"];

        expect(authorizationHeader).toBe("Bearer abc");
      });

      it("should return a fetchOptions object with optional header", () => {
        const classBearerFixture = Object.assign({}, classFixture, {
          _headers: headers
        });

        let optionalHeader = buildFetchOptions
          .bind(classBearerFixture)(optionsFixture).options
          .headers["X-Custom-Header"];

        expect(optionalHeader).toBe("foo");
      });

      it("should not append url with apiUrl when oauth is set to true on the options argument", () => {
        const options = Object.assign({}, optionsFixture, {
          url: "http://naoufal.com/oauth",
          oauth: true
        });

        let url = buildFetchOptions.bind(classFixture)(options).url;

        expect(url).toBe("http://naoufal.com/oauth");
      });

      it("should return a fetchOptions object with body key", () => {
        const options = Object.assign({}, optionsFixture, {
          body: { foo: "bar" }
        });

        let body = buildFetchOptions.bind(classFixture)(options).options.body;

        expect(body).toBe("foo=bar");
      });
    });
  });
});
