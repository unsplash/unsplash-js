/* @flow */

export default function curatedBatches(): Object {
  return {
    listCollections: (page, perPage) => {
      const url = "/collections";
      const query = {
        page,
        per_page: perPage
      };

      return this.request({
        url: url,
        method: "GET",
        query
      });
    },

    listCuratedCollections: (page, perPage) => {
      const url = "/collections/curated";
      const query = {
        page,
        per_page: perPage
      };

      return this.request({
        url: url,
        method: "GET",
        query
      });
    },

    getCollection: (id) => {
      const url = `/collections/${id}`;

      return this.request({
        url: url,
        method: "GET"
      });
    },

    getCuratedCollectionPhotos: collectionPhotos.bind(this, true),

    getCollectionPhotos: collectionPhotos.bind(this, false),

    createCollection: createUpdateCollection.bind(this, null),

    updateCollection: createUpdateCollection.bind(this),

    deleteCollection: (id) => {
      const url = `/collections/${id}`;

      return this.request({
        url: url,
        method: "DELETE"
      });
    },

    addPhotoToCollection: (collectionId, photoId) => {
      const url = `/collections/${collectionId}/add`;

      return this.request({
        url: url,
        method: "POST",
        body: {
          photo_id: photoId
        }
      });
    },

    removePhotoFromCollection: (collectionId, photoId) => {
      const url = `/collections/${collectionId}/remove`;

      return this.request({
        url: url,
        method: "DELETE",
        body: {
          photo_id: photoId
        }
      });
    }
  };
}

function collectionPhotos(isCurated, id) {
  const url = isCurated
    ? `/collections/curated/${id}/photos`
    : `/collections/${id}/photos`;

  return this.request({
    url: url,
    method: "GET"
  });
}

function createUpdateCollection(id, title, description, isPrivate) {
  const url = id
    ? `/collections/${id}`
    : "/collections";
  const body = {
    title,
    description,
    "private": isPrivate
  };

  return this.request({
    url: url,
    method: id
      ? "PUT"
      : "POST",
    body
  });
}
