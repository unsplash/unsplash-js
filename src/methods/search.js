/* @flow */

export default function search(): Object {
  return {
    photos: (keyword = "", page = 1, perPage = 10)  => {
      const query = {
        query: keyword,
        per_page: perPage,
        page
      };

      return this.request({
        url: "/search/photos",
        method: "GET",
        query
      });
    },

    users: (keyword = "", page = 1, perPage = 10)  => {
      const query = {
        query: keyword,
        per_page: perPage,
        page
      };

      return this.request({
        url: "/search/users",
        method: "GET",
        query
      });
    },

    collections: (keyword = "", page = 1, perPage = 10)  => {
      const query = {
        query: keyword,
        per_page: perPage,
        page
      };

      return this.request({
        url: "/search/collections",
        method: "GET",
        query
      });
    }
  };
}
