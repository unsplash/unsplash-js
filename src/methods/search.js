/* @flow */

export default function search(): Object {
  return {
    all: universalSearcher.bind(this, "/search"),

    photos: photosSearcher.bind(this, "/search/photos"),

    users: universalSearcher.bind(this, "/search/users"),

    collections: universalSearcher.bind(this, "/search/collections")
  };
}

function photosSearcher(url, keyword = "", page = 1, per_page = 10,collections = [""],orientation = undefined) {
  const query ={
    query: keyword,
    page,
    per_page,
    collections: collections.length > 1 ? 
      collections.join(",") : collections.toString()
  };
  if (orientation){
    const defineProperty = Object.defineProperty;
    defineProperty(query, "orientation",({
      value:orientation,
      configurable:true,
      enumerable:true
    } : Object));
  }
  return this.request({
    url,
    method: "GET",
    query
  }); 
}

function universalSearcher(url, keyword = "", page = 1, per_page = 10){
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

