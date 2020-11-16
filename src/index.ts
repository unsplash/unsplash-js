import { flow } from './helpers/fp';
import { initMakeRequest } from './helpers/request';
import * as collections from './methods/collections';
import * as photos from './methods/photos';
import * as search from './methods/search';
import * as users from './methods/users';

export const Unsplash = flow(initMakeRequest, makeRequest => ({
  photos: {
    get: flow(photos.get.handleRequest, makeRequest(photos.get.handleResponse)),

    list: flow(
      photos.list.handleRequest,
      makeRequest(photos.list.handleResponse),
    ),
    getStats: flow(
      photos.getStats.handleRequest,
      makeRequest(photos.getStats.handleResponse),
    ),
    getRandom: flow(
      photos.getRandom.handleRequest,
      makeRequest(photos.getRandom.handleResponse),
    ),
    track: flow(
      photos.track.handleRequest,
      makeRequest(photos.track.handleResponse),
    ),
  },
  users: {
    getPhotos: flow(
      users.getPhotos.handleRequest,
      makeRequest(users.getPhotos.handleResponse),
    ),
    getCollections: flow(
      users.getCollections.handleRequest,
      makeRequest(users.getCollections.handleResponse),
    ),
    getLikes: flow(
      users.getLikes.handleRequest,
      makeRequest(users.getLikes.handleResponse),
    ),
    get: flow(users.get.handleRequest, makeRequest(users.get.handleResponse)),
  },
  search: {
    getCollections: flow(
      search.getCollections.handleRequest,
      makeRequest(search.getCollections.handleResponse),
    ),
    getPhotos: flow(
      search.getPhotos.handleRequest,
      makeRequest(search.getPhotos.handleResponse),
    ),
    getUsers: flow(
      search.getUsers.handleRequest,
      makeRequest(search.getUsers.handleResponse),
    ),
  },
  collections: {
    getPhotos: flow(
      collections.getPhotos.handleRequest,
      makeRequest(collections.getPhotos.handleResponse),
    ),
    get: flow(
      collections.get.handleRequest,
      makeRequest(collections.get.handleResponse),
    ),
    list: flow(
      collections.list.handleRequest,
      makeRequest(collections.list.handleResponse),
    ),
    getRelated: flow(
      collections.getRelated.handleRequest,
      makeRequest(collections.getRelated.handleResponse),
    ),
  },
}));
