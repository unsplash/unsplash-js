/* @flow */
import { getUrlComponents } from "../utils";
import get from "lodash.get";

export default function photos(): Object {
  return {
    listPhotos: (page = 1, perPage = 10, orderBy = "latest")  => {
      const url = "/photos";
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

    listCuratedPhotos: (page = 1, perPage = 10, orderBy = "latest")  => {
      const url = "/photos/curated";
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

    searchPhotos: (q, category = [""], page = 1, perPage = 10) => {
      const url = "/photos/search";
      const query = {
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
      const query = {
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

    getPhotoStats: (id) => {
      const url = `/photos/${id}/stats`;

      return this.request({
        url,
        method: "GET"
      });
    },

    getRandomPhoto: (options = {}) => {
      const url = "/photos/random";
      const category = options.category || [];
      const collections = options.collections || [];

      const query = {
        featured: options.featured,
        username: options.username,
        orientation: options.orientation,
        category: category.join(),
        collections: collections.join(),
        query: options.query,
        w: options.width,
        h: options.height,
        c: options.cacheBuster || new Date().getTime(), // Avoid ajax response caching
        count: options.count
      };

      Object.keys(query).forEach(key => {
        if (!query[key]) {
          delete query[key];
        }
      });

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
    },

    downloadPhoto: (photo) => {
      const downloadLocation = get(photo, "links.download_location", undefined);

      if (downloadLocation === undefined) {
        throw new Error(`Object received is not a photo. ${photo}`);
      }

      const urlComponents = getUrlComponents(downloadLocation);

      return this.request({
        url: urlComponents.pathname,
        method: "GET",
        query: urlComponents.query
      });
    }
  };
}
