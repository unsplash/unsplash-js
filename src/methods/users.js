/* @flow */

export default function users(): Object {
  return {
    profile: (username: string) => {
      const url = `/users/${username}`;

      return this.request({
        url,
        method: "GET"
      });
    },

    photos: (username: string, page: number = 1, perPage: number = 10, orderBy: string = "latest") => {
      const url = `/users/${username}/photos`;
      const query = {
        page,
        per_page: perPage,
        order_by: orderBy
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    likes: (username: string, page: number = 1, perPage: number = 10, orderBy: string = "latest") => {
      const url = `/users/${username}/likes`;
      const query = {
        page,
        per_page: perPage,
        order_by: orderBy
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    collections: (username: string, page: number = 1, perPage: number = 10) => {
      const url = `/users/${username}/collections`;
      const query = {
        page,
        per_page: perPage
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    }
  };
}
