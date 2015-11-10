export function requireFetch() {
  const isClient = process.browser || false;

  return isClient
    ? window.fetch
    : require("node-fetch");
}
