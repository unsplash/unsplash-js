/* @flow */

import { API_URL, API_VERSION } from "./constants";
import { bodyToFormData } from "./utils";
import { requireFetch } from "./services";

import URI from "urijs";

const fetch = requireFetch();

import auth from "./methods/auth";
import currentUser from "./methods/currentUser";
import users from "./methods/users";
import photos from "./methods/photos";
import categories from "./methods/categories";
import curatedBatches from "./methods/curatedBatches";
import stats from "./methods/stats";

export default class Unsplash {
  _apiUrl: string;
  _apiVersion: string;
  _applicationId: string;
  _secret: string;
  _callbackUrl: string;
  _bearerToken: string;

  auth: Object;
  currentUser: Function;
  users: Object;
  photos: Object;
  categories: Object;
  curatedBatches: Object;
  stats: Object;

  constructor(options: { applicationId: string, secret: string, callbackUrl: string }) {
    this._apiUrl = API_URL;
    this._apiVersion = API_VERSION;
    this._applicationId = options.applicationId;
    this._secret = options.secret;
    this._callbackUrl = options.callbackUrl;

    this.auth = auth.bind(this)();
    this.currentUser = currentUser.bind(this);
    this.users = users.bind(this)();
    this.photos = photos.bind(this)();
    this.categories = categories.bind(this)();
    this.curatedBatches = curatedBatches.bind(this)();
    this.stats = stats.bind(this)();
  }

  request(options: { url: string, method: string, query: Object, headers: Object, body: Object, oauth: boolean }) {
    let { method, query, oauth, body } = options;
    let url = oauth === true
      ? URI(options.url)
      : URI(`${this._apiUrl}${options.url}`);
    let headers = Object.assign({}, options.headers, {
      "Accept-Version": this._apiVersion,
      "Authorization": this._bearerToken
        ? `Bearer ${this._bearerToken}`
        : `Client-ID ${this._applicationId}`
    });

    if (query) {
      url.query(query);
    }

    return fetch(url.href(), {
      method,
      headers,
      body: method === "POST" && body
        ? bodyToFormData(body)
        : undefined
    });
  }

  setBearerToken(accessToken: string) {
    if (accessToken) {
      this._bearerToken = accessToken;
    }
  }
}
