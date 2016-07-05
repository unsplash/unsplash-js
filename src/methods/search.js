/* @flow */

export default function search(): Object {
  return {
    all: (keyword, page = 1)  => {
      const url = "/search";
      const query = {
        query: keyword,
        page
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    photos: (keyword, page = 1)  => {
      const url = "/search/photos";
      const query = {
        query: keyword,
        page
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    users: (keyword, page = 1)  => {
      const url = "/search/users";
      const query = {
        query: keyword,
        page
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    collections: (keyword, page = 1)  => {
      const url = "/search/collections";
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
  };
}
