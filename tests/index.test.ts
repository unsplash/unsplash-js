import { buildUrl, CompleteRequestParams } from '../src/helpers/request';
import * as collections from '../src/methods/collections';
import * as photos from '../src/methods/photos';
import * as search from '../src/methods/search';
import * as users from '../src/methods/users';
import { createApi } from '../src';
import { OrderBy } from '../src/types/request';

describe('buildUrl', () => {
  it('combines pathname, query and domain correctly', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: { a: 1, b: 2 } })('https://example.com');
    expect(output).toEqual('https://example.com/foo/bar?a=1&b=2');
  });

  it('handles empty query correctly', () => {
    const output = buildUrl({ pathname: '/foo/bar' })('https://example.com');
    expect(output).toEqual('https://example.com/foo/bar');
  });

  it('handles undefined query properties correctly', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: { a: 1, b: undefined } })(
      'https://example.com',
    );
    expect(output).toEqual('https://example.com/foo/bar?a=1');
  });

  it('handles query with only undefined properties correctly', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: { b: undefined } })(
      'https://example.com',
    );
    expect(output).toEqual('https://example.com/foo/bar');
  });
});

const PHOTO_ID = 'abc123';
const USERNAME = 'usernametest';
const SEARCH_QUERY = 'cat';
const COLLECTION_ID = 'collection123';

type Section = keyof ReturnType<typeof createApi>;
const paramsTests: Record<Section, { [index: string]: CompleteRequestParams[] }> = {
  photos: {
    get: [photos.get.handleRequest({ photoId: PHOTO_ID })],
    list: [
      photos.list.handleRequest({ orderBy: OrderBy.LATEST, page: 4, perPage: 10 }),
      photos.list.handleRequest({ orderBy: OrderBy.LATEST }),
    ],
    getStats: [photos.getStats.handleRequest({ photoId: PHOTO_ID })],
    getRandom: [photos.getRandom.handleRequest({})],
    track: [
      photos.track.handleRequest({
        downloadLocation: 'https://api.unsplash.com/photos/foo123/download',
      }),
    ],
  },
  users: {
    getPhotos: [users.getPhotos.handleRequest({ username: USERNAME })],
    getCollections: [users.getCollections.handleRequest({ username: USERNAME })],
    getLikes: [users.getLikes.handleRequest({ username: USERNAME })],
    get: [users.get.handleRequest({ username: USERNAME })],
  },
  search: {
    getCollections: [search.getCollections.handleRequest({ query: SEARCH_QUERY })],
    getPhotos: [search.getPhotos.handleRequest({ query: SEARCH_QUERY })],
    getUsers: [search.getUsers.handleRequest({ query: SEARCH_QUERY })],
  },
  collections: {
    getPhotos: [collections.getPhotos.handleRequest({ collectionId: COLLECTION_ID })],
    get: [collections.get.handleRequest({ collectionId: COLLECTION_ID })],
    list: [collections.list.handleRequest({})],
    getRelated: [collections.getRelated.handleRequest({ collectionId: COLLECTION_ID })],
  },
};

describe('requestParams', () => {
  Object.entries(paramsTests).forEach(([sectionName, section]) => {
    describe(`${sectionName}`, () => {
      Object.entries(section).forEach(([methodName, methodTests]) => {
        describe(`${methodName}: `, () => {
          it('Correcty builds request arguments', () => {
            methodTests.forEach(output => expect(output).toMatchSnapshot());
          });
        });
      });
    });
  });
});
