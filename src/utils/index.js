/* @flow */

import FormData from "form-data";
import URI from "urijs";

export function bodyToFormData(body: Object) {
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

  return {
    url: url.href(),
    options: {
      method,
      headers,
      body: method === "POST" && body
        ? bodyToFormData(body)
        : undefined
    }
  };
}
