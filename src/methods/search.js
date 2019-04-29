/* @flow */

export default function search(): Object {
  return {
    all: searcher.bind(this, "/search"),

    photos: photosSearcher.bind(this, "/search/photos"),

    users: searcher.bind(this, "/search/users"),

    collections: searcher.bind(this, "/search/collections")
  };
}

function searcher(url, keyword = "", page = 1, per_page = 10) {
  const query = {
    query: keyword,
    page,
    per_page
  };

  return this.request({
    url,
    method: "GET",
    query
  });
}

function photosSearcher(url, keyword = "", page = 1, per_page = 10, collections = undefined, orientation = undefined) {
  const query: Object = {
    query: keyword,
    page,
    per_page
  };

  if (Array.isArray(collections)) {
    query.collections = collections.join(",");
  }

  if (orientation) {
    query.orientation = orientation;
  }

  return this.request({
    url,
    method: "GET",
    query
  });
}
