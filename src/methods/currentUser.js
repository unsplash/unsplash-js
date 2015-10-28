export default function currentUser() {
  const url = "/me";

  return this.request({
    url,
    method: "GET"
  });
}
