import Unsplash from "../src/unsplash.js";
import expect, { spyOn, restoreSpies } from "expect";

describe("Unsplash", () => {
  describe("constructor", () => {
    const applicationId = "applicationId";
    const secret = "secret";

    let unsplash = new Unsplash({
      applicationId: applicationId,
      secret: secret
    });

    it("should successfully construct an Unsplash instance", () => {
      expect(unsplash).toBeAn(Unsplash);
    });

    it("should set an apiUrl on the Unsplash instance", () => {
      expect(unsplash.apiUrl).toBe("https://api.unsplash.com");
    });

    it("should set the applicationId argument on the Unsplash instance", () => {
      expect(unsplash.applicationId).toBe(applicationId);
    });

    it("should set the secret argument on the Unsplash instance", () => {
      expect(unsplash.secret).toBe(secret);
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
  });

  describe("auth", () => {
    const applicationId = "foo";
    const secret = "bar";

    let unsplash = new Unsplash({
      applicationId: applicationId,
      secret: secret
    });

    describe("getAuthenticationUrl", () => {
      expect(unsplash.auth.getAuthenticationUrl("http://foo.com", ["public", "read_user"]))
        .toBe(`https://unsplash.com/oauth/authorize?client_id=${applicationId}&redirect_uri=http://foo.com&response_type=code&scope=public+read_user`);
    });

    describe("userAuthentication", () => {
      let spy = spyOn(unsplash, "request");
      unsplash.auth.userAuthentication("http://foo.com", "oauth_code");

      expect(spy.calls.length).toEqual(1);
      expect(spy.calls[0].arguments).toEqual([{
        url: "https://unsplash.com/oauth/token",
        method: "POST",
        body: {
          client_id: "foo",
          client_secret: "bar",
          redirect_uri: "http://foo.com",
          code: "oauth_code",
          grant_type: "authorization_code"
        },
        oauth: true
      }]);

      restoreSpies();
    });
  });

  describe("currentUser", () => {
    let unsplash = new Unsplash({
      applicationId: "foo",
      secret: "bar"
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
      applicationId: "foo",
      secret: "bar"
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
});
