/* @flow */

export default function collections(): Object {
  return {
    listCollections: (page: number = 1, perPage: number = 10) => {
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

    getCollection: collection.bind(this),

    getCollectionPhotos: collectionPhotos.bind(this),

    createCollection: createUpdateCollection.bind(this, null),

    updateCollection: createUpdateCollection.bind(this),

    deleteCollection: (id: string) => {
      const url = `/collections/${id}`;

      return this.request({
        url: url,
        method: "DELETE"
      });
    },

    addPhotoToCollection: (collectionId: string, photoId: string) => {
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

function collection(id: string) {
  return this.request({
    url: `/collections/${id}`,
    method: "GET"
  });
}

function collectionPhotos(
  id: string,
  page: number = 1,
  perPage: number = 10,
  orderBy: string = "latest"
) {
  const query = {
    page,
    per_page: perPage,
    order_by: orderBy
  };

  return this.request({
    url: `/collections/${id}/photos`,
    method: "GET",
    query
  });
}

function createUpdateCollection(
  id: ?string,
  title: string,
  description: string,
  isPrivate: bool
) {
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
