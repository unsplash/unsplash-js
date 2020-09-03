export default function collections() {
  return {
    listCollections: (page = 1, perPage = 10) => {
      const url = "/collections";

      const query = {
        per_page: perPage,
        page
      };

      return this.request({
        url: url,
        method: "GET",
        query
      });
    },

    getCollection: collection.bind(this),

    getCollectionPhotos: collectionPhotos.bind(this),

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
      const url = `/collections/${collectionId}/remove?photo_id=${photoId}`;

      return this.request({
        url: url,
        method: "DELETE"
      });
    },

    listRelatedCollections: (collectionId) => {
      const url = `/collections/${collectionId}/related`;

      return this.request({
        url: url,
        method: "GET"
      });
    }
  };
}

function collection(id) {
  return this.request({
    url: `/collections/${id}`,
    method: "GET"
  });
}

function collectionPhotos(
  id,
  page = 1,
  perPage = 10,
  orderBy = "latest",
  options = {},
) {
  const query = {
    per_page: perPage,
    order_by: orderBy,
    orientation: options.orientation,
    page
  };

  Object.keys(query).forEach(key => {
    if (!query[key]) {
      delete query[key];
    }
  });

  return this.request({
    url: `/collections/${id}/photos`,
    method: "GET",
    query
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
