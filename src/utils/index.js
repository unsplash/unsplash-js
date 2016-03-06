/* @flow */
import { stringify as qsStringify } from "querystring";
import formurlencoded from "form-urlencoded";

export function formUrlEncode(body: Object): Object {
  return formurlencoded(body);
}

export function buildFetchOptions(
  options: {
    url: string,
    method: string,
    query: Object,
    headers: Object,
    body: Object,
    oauth: boolean
  }
): Object {
  let { method, query, oauth, body } = options;
  let url = (oauth === true)
    ? options.url
    : `${this._apiUrl}${options.url}`;
  let headers = Object.assign({}, options.headers, {
    "Accept-Version": this._apiVersion,
    "Authorization": this._bearerToken
      ? `Bearer ${this._bearerToken}`
      : `Client-ID ${this._applicationId}`
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
