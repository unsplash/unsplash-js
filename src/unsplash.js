import { API_URL, API_VERSION } from "./constants";
import { buildFetchOptions } from "./utils";

import auth from "./methods/auth";
import currentUser from "./methods/currentUser";
import users from "./methods/users";
import photos from "./methods/photos";
import collections from "./methods/collections";
import search from "./methods/search";
import stats from "./methods/stats";

export default class Unsplash {
  constructor(options = {}) {
    this._apiUrl = options.apiUrl || API_URL;
    this._apiVersion = options.apiVersion || API_VERSION;
    this._accessKey = options.accessKey;
    this._secret = options.secret;
    this._callbackUrl = options.callbackUrl;
    this._bearerToken = options.bearerToken;
    this._headers = options.headers || {};
    this._timeout = options.timeout || 0; // 0 defaults to the OS timeout behaviour.

    this.auth = auth.bind(this)();
    this.currentUser = currentUser.bind(this)();
    this.users = users.bind(this)();
    this.photos = photos.bind(this)();
    this.collections = collections.bind(this)();
    this.search = search.bind(this)();
    this.stats = stats.bind(this)();
  }

  request(requestOptions = {}) {
    var { url, options } = buildFetchOptions.bind(this)(requestOptions);

    return fetch(url, options);
  }
}

export function toJson(res) {
  return typeof res.json === "function" ? res.json() : res;
}
