export function responseJson(res) {
  return res.json();
}

export function requireFetch() {
  const __CLIENT__ = __CLIENT__ || false;

  return __CLIENT__ ? require("fetch") : require("node-fetch");
}
