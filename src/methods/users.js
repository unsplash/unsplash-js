export default function users() {
  return {
    profile: (username) => {
      const url = `/users/${username}`;

      return this.request({
        url,
        method: "GET"
      });
    },

    photos: (
      username,
      page = 1,
      perPage = 10,
      orderBy = "latest",
      options = {}
    ) => {
      const stats = options.stats || false;
      const url = `/users/${username}/photos`;
      const query = {
        page,
        per_page: perPage,
        order_by: orderBy,
        orientation: options.orientation,
        stats
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

    likes: (username, page = 1, perPage = 10, orderBy = "latest", options = {}) => {
      const url = `/users/${username}/likes`;
      const query = {
        page,
        per_page: perPage,
        order_by: orderBy,
        orientation: options.orientation
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

    collections: (username, page = 1, perPage = 10, orderBy = "published") => {
      const url = `/users/${username}/collections`;
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

    statistics: (username, resolution = "days", quantity = 30) => {
      const url = `/users/${username}/statistics`;
      const query = {
        resolution,
        quantity
      };

      return this.request({
        url,
        method: "GET",
        query
      });
    }
  };
}
