import { flow } from './helpers/fp';
import { initMakeRequest, RequestParams } from './helpers/request';
import { HandleResponse } from './helpers/response';
import * as collections from './methods/collections';
import * as photos from './methods/photos';
import * as search from './methods/search';
import * as users from './methods/users';

export const Unsplash = flow(initMakeRequest, makeRequest => {
  const generateMethod = <A extends unknown[], B>({
    handleRequest,
    handleResponse,
  }: {
    handleRequest: (...a: A) => RequestParams;
    handleResponse: HandleResponse<B>;
  }) => flow(handleRequest, makeRequest(handleResponse));

  return {
    photos: {
      get: generateMethod(photos.get),
      list: generateMethod(photos.list),
      getStats: generateMethod(photos.getStats),
      getRandom: generateMethod(photos.getRandom),
      track: generateMethod(photos.track),
    },
    users: {
      getPhotos: generateMethod(users.getPhotos),
      getCollections: generateMethod(users.getCollections),
      getLikes: generateMethod(users.getLikes),
      get: generateMethod(users.get),
    },
    search: {
      getCollections: generateMethod(search.getCollections),
      getPhotos: generateMethod(search.getPhotos),
      getUsers: generateMethod(search.getUsers),
    },
    collections: {
      getPhotos: generateMethod(collections.getPhotos),
      get: generateMethod(collections.get),
      list: generateMethod(collections.list),
      getRelated: generateMethod(collections.getRelated),
    },
  };
});

export const trackNonHotLinkedPhotoView = ({ appId }: { appId: string }) => ({
  photoId,
}: {
  photoId: string;
}) => fetch(`views.unsplash.com/v?photo_id=${photoId}&app_id=${appId}`);
