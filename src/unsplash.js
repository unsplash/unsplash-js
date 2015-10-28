/* @flow */

import { API_URL, API_VERSION } from "./constants";
import { requireFetch } from "./utils";

import URI from "URIjs";
const fetch = requireFetch();

import currentUser from "./methods/currentUser";
import user from "./methods/user";
import photos from "./methods/photos";
import categories from "./methods/categories";
import curatedBatches from "./methods/curatedBatches";

export default class Unsplash {
  apiUrl: string;
  apiVersion: string;
  applicationId: string;
  secret: string;

  currentUser: Function;
  user: Object;
  photos: Object;
  categories: Object;
  curatedBatches: Object;

  constructor(options: { applicationId: string, secret: string }) {
    this.apiUrl = API_URL;
    this.apiVersion = API_VERSION;
    this.applicationId = options.applicationId;
    this.secret = options.secret;

    this.currentUser = currentUser.bind(this);
    this.user = user.bind(this)();
    this.photos = photos.bind(this)();
    this.categories = categories.bind(this)();
    this.curatedBatches = curatedBatches.bind(this)();
  }

  request(options: { url: string, method: string, query: Object, headers: Object, body: Object }) {
    let { method, query } = options;
    let url = URI(`${this.apiUrl}${options.url}`);
    let headers = Object.assign({}, options.headers, {
      "Accept-Version": this.apiVersion,
      "Authorization": `Client-ID ${this.applicationId}`
    });

    if (query) {
      url.query(query);
    }

    return fetch(url.href(), {
      method,
      headers
    });
  }
}
