import { initMakeRequest } from './helpers/request';
import * as photos from './methods/photos';
import * as search from './methods/search';
import * as users from './methods/users';
import * as collections from './methods/collections';
import { flow } from './helpers/fp';

export const Unsplash = flow(initMakeRequest, makeRequest => ({
  photos: {
    get: flow(photos.get, makeRequest),
    listFeed: flow(photos.listFeed, makeRequest),
    getStats: flow(photos.getStats, makeRequest),
    getRandom: flow(photos.getRandom, makeRequest),
    track: flow(photos.track, makeRequest),
  },
  users: {
    getPhotos: flow(users.getPhotos, makeRequest),
    getCollections: flow(users.getCollections, makeRequest),
    getLikes: flow(users.getLikes, makeRequest),
    get: flow(users.get, makeRequest),
  },
  search: {
    getCollections: flow(search.getCollections, makeRequest),
    getPhotos: flow(search.getPhotos, makeRequest),
    getUsers: flow(search.getUsers, makeRequest),
  },
  collections: {
    getPhotos: flow(collections.getPhotos, makeRequest),
    get: flow(collections.get, makeRequest),
    list: flow(collections.list, makeRequest),
    getRelated: flow(collections.getRelated, makeRequest),
  },
}));
