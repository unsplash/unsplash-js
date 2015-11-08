/* @flow */

import FormData from "form-data";

export function requireFetch() {
  const __CLIENT__ = __CLIENT__ || false;

  return __CLIENT__ ? require("fetch") : require("node-fetch");
}

export function bodyToFormData(body: Object) {
  let postBody = new FormData();
  Object.keys(body).forEach((key) => {
    postBody.append(key, body[key]);
  });

  return postBody;
}
