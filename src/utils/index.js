import { stringify as qsStringify } from "querystring";
import formurlencoded from "form-urlencoded";
import parse from "url-parse";

export function formUrlEncode(body) {
  return formurlencoded(body);
}

export function getUrlComponents(uri) {
  return parse(uri, {}, true);
}

export function buildFetchOptions(options = {}) {
  let { method, query, oauth, body } = options;
  let url = (oauth === true)
    ? options.url
    : `${this._apiUrl}${options.url}`;
  let headers = Object.assign({}, this._headers, options.headers, {
    "Accept-Version": this._apiVersion,
    "Authorization": this._bearerToken
      ? `Bearer ${this._bearerToken}`
      : `Client-ID ${this._accessKey}`
  });
  let timeout = this._timeout;

  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  if (query) {
    url = decodeURIComponent(`${url}?${qsStringify(query)}`);
  }

  return {
    url: url,
    options: {
      method,
      headers,
      timeout,
      body: (method !== "GET") && body
        ? formUrlEncode(body)
        : undefined
    }
  };
}
