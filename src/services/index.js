export function requireFetch() {
  const isClient = process.env.browser || false;

  return isClient
    ? require("fetch")
    : require("node-fetch");
}
