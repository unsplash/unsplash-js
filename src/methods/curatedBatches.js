/* @flow */

export default function curatedBatches(): Object {
  return {
    listCuratedBatches: (page, perPage) => {
      const url = "/curated_batches";

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

    curatedBatch: (id) => {
      const url = `/curated_batches/${id}`;

      return this.request({
        url,
        method: "GET"
      });
    },

    curatedBatchPhotos: (id) => {
      const url = `/curated_batches/${id}/photos`;

      return this.request({
        url,
        method: "GET"
      });
    }
  };
}
