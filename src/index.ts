import { flow } from './helpers/fp';
import { initMakeRequest } from './helpers/request';
import * as collections from './methods/collections';
import * as photos from './methods/photos';
import * as search from './methods/search';
import * as users from './methods/users';

export const createApi = flow(initMakeRequest, makeRequest => ({
  photos: {
    get: makeRequest(photos.get),
    list: makeRequest(photos.list),
    getStats: makeRequest(photos.getStats),
    getRandom: makeRequest(photos.getRandom),
    track: makeRequest(photos.track),
  },
  users: {
    getPhotos: makeRequest(users.getPhotos),
    getCollections: makeRequest(users.getCollections),
    getLikes: makeRequest(users.getLikes),
    get: makeRequest(users.get),
  },
  search: {
    getCollections: makeRequest(search.getCollections),
    getPhotos: makeRequest(search.getPhotos),
    getUsers: makeRequest(search.getUsers),
  },
  collections: {
    getPhotos: makeRequest(collections.getPhotos),
    get: makeRequest(collections.get),
    list: makeRequest(collections.list),
    getRelated: makeRequest(collections.getRelated),
  },
}));

export const trackNonHotLinkedPhotoView = ({ appId }: { appId: string }) => ({
  photoId,
}: {
  photoId: string;
}) => fetch(`views.unsplash.com/v?photo_id=${photoId}&app_id=${appId}`);
