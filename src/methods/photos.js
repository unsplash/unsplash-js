/* @flow */

export default function photos(): Object {
  return {
    listPhotos: (page, perPage)  => {
      const url = "/photos";

      let query = {
        page,
        per_page: perPage
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    searchPhotos: (q, category = [""], page, perPage) => {
      const url = "/photos/search";

      let query = {
        query: q,
        category: category.length > 1
          ? category.join(",")
          : category.toString(),
        page,
        per_page: perPage
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    getPhoto: (id, width, height, rectangle) => {
      const url = `/photos/${id}`;

      let query = {
        w: width,
        h: height,
        rect: rectangle
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    getRandomPhoto: (width, height, q, username, featured, category) => {
      const url = "/photos/random";

      let query = {
        category,
        featured,
        username,
        query: q,
        w: width,
        h: height
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    },

    uploadPhoto: (photo) => {
      if (!this._bearerToken) {
        throw new Error("Requires a bearerToken to be set.");
      }

      const url = "/photos";

      return this.request({
        url,
        method: "POST",
        body: {
          photo: photo
        }
      });
    },

    likePhoto: (id) => {
      if (!this._bearerToken) {
        throw new Error("Requires a bearerToken to be set.");
      }

      const url = `/photos/${id}/like`;

      return this.request({
        url,
        method: "POST"
      });
    },

    unlikePhoto: (id) => {
      if (!this._bearerToken) {
        throw new Error("Requires a bearerToken to be set.");
      }

      const url = `/photos/${id}/like`;

      return this.request({
        url,
        method: "DELETE"
      });
    }
  };
}
