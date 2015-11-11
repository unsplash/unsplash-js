/* @flow */
import { stringify as qsStringify } from "querystring";

const FormData = process.browser
  ? window.FormData
  : require("form-data");

export function bodyToFormData(body: Object): Object {
  let postBody = new FormData();
  Object.keys(body).forEach((key) => {
    postBody.append(key, body[key]);
  });

  return postBody;
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

  if (query) {
    url = decodeURIComponent(`${url}?${qsStringify(query)}`);
  }

  return {
    url: url,
    options: {
      method,
      headers,
      body: method === "POST" && body
        ? bodyToFormData(body)
        : undefined
    }
  };
}
