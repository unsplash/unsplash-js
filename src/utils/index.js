/* @flow */

import FormData from "form-data";

export function bodyToFormData(body: Object) {
  let postBody = new FormData();
  Object.keys(body).forEach((key) => {
    postBody.append(key, body[key]);
  });

  return postBody;
}
