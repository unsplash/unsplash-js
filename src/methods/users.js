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

    photos: (username: string) => {
      const url = `/users/${username}/photos`;

      return this.request({
        url,
        method: "GET"
      });
    },

    likes: (username: string, page: number, perPage: number) => {
      const url = `/users/${username}/likes`;

      let query = {
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
