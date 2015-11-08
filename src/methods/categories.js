/* @flow */

export default function categories(): Object {
  return {
    listCategories: () => {
      const url = "/categories";

      return this.request({
        url,
        method: "GET"
      });
    },

    category: (id) => {
      const url = `/categories/${id}`;

      return this.request({
        url,
        method: "GET"
      });
    },

    categoryPhotos: (id, page, perPage) => {
      const url = `/categories/${id}/photos`;

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
