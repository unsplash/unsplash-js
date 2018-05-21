/* @flow */
import { stringify as qsStringify } from "querystring";
import formurlencoded from "form-urlencoded";
import parse from "url-parse";

export function formUrlEncode(body: Object): Object {
  return formurlencoded(body);
}

export function getUrlComponents(uri: String): Object {
  return parse(uri, {}, true);
}

export function buildFetchOptions(
  options: {
    url: string,
    method: string,
    query: Object,
    headers: Object,
    body: Object,
    oauth: boolean,
    reporter: boolean
  }
): Object {
  let { method, query, oauth, body, reporter } = options;

  let hostUrl = reporter ? this._reporterUrl : this._apiUrl;
  let url = (oauth === true)
    ? options.url
    : `${hostUrl}${options.url}`;
  let headers = Object.assign({}, this._headers, options.headers, {
    "Accept-Version": this._apiVersion,
    "Authorization": this._bearerToken
      ? `Bearer ${this._bearerToken}`
      : `Client-ID ${this._access}`
  });

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
      body: (method !== "GET") && body
        ? formUrlEncode(body)
        : undefined
    }
  };
}
