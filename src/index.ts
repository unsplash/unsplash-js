import { flow } from './helpers/fp';
import { initMakeRequest } from './helpers/request';
import * as collections from './methods/collections';
import * as photos from './methods/photos';
import * as search from './methods/search';
import * as users from './methods/users';

import * as _internals from './internals';

export const createApi = flow(initMakeRequest, makeRequest => ({
  photos: {
    get: makeRequest(photos.get),
    list: makeRequest(photos.list),
    getStats: makeRequest(photos.getStats),
    getRandom: makeRequest(photos.getRandom),
    trackDownload: makeRequest(photos.trackDownload),
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

export { Language, ColorId, ContentFilter, SearchOrderBy } from './methods/search/types';
export { OrderBy, Orientation } from './types/request';
export { _internals };
