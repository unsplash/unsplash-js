/* @flow */

export default function search(): Object {
  return {
    all: searcher.bind(this, "/search"),

    photos: searcher.bind(this, "/search/photos"),

    users: searcher.bind(this, "/search/users"),

    collections: searcher.bind(this, "/search/collections")
  };
}

function searcher(url, keyword = "", page = 1) {
  const query = {
    query: keyword,
    page
  };

  return this.request({
    url,
    method: "GET",
    query
  });
}
