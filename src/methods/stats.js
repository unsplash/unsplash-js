/* @flow */

export default function stats(): Object {
  return {
    total: () => {
      const url = "/stats/total";

      return this.request({
        url,
        method: "GET"
      });
    },

    reportViews: (photoIds) => {
      const url = "/v";

      const query = {
        app_id: this._applicationId,
        photo_id: Array.isArray(photoIds) ? photoIds.join(",") : photoIds
      };

      return this.request({
        url,
        method: "GET",
        query,
        reporter: true
      });
    }
  };
}
