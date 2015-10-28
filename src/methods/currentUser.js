/* @flow */

export default function currentUser(): Promise {
  const url = "/me";

  return this.request({
    url,
    method: "GET"
  });
}
