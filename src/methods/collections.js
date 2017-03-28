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

    listCuratedCollections: (page: number = 1, perPage: number = 10) => {
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

    listFeaturedCollections: (page: number = 1, perPage: number = 10) => {
      const url = "/collections/featured";
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

    getCollection: collection.bind(this, false),

    getCuratedCollection: collection.bind(this, true),

    getCuratedCollectionPhotos: collectionPhotos.bind(this, true),

    getCollectionPhotos: collectionPhotos.bind(this, false),

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

function collection(isCurated: bool, id: string) {
  const url = isCurated
    ? `/collections/curated/${id}`
    : `/collections/${id}`;

  return this.request({
    url: url,
    method: "GET"
  });
}

function collectionPhotos(
  isCurated: bool,
  id: string,
  page: number = 1,
  perPage: number = 10,
  orderBy: string = "latest"
) {
  const url = isCurated
    ? `/collections/curated/${id}/photos`
    : `/collections/${id}/photos`;

  const query = {
    page,
    per_page: perPage,
    order_by: orderBy
  };

  return this.request({
    url: url,
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
