import { buildUrl, CompleteRequestParams } from '../src/helpers/request';
import * as collections from '../src/methods/collections';
import * as photos from '../src/methods/photos';
import * as search from '../src/methods/search';
import * as users from '../src/methods/users';
import { createApi } from '../src';
import { OrderBy } from '../src/types/request';
import { Language } from '../src/methods/search/types';

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
      // TO-DO: figure out type arthimetic to allow for no object to be provided
      photos.list.handleRequest({}),
    ],
    getStats: [photos.getStats.handleRequest({ photoId: PHOTO_ID })],
    getRandom: [
      photos.getRandom.handleRequest({}),
      photos.getRandom.handleRequest({
        collectionIds: ['a', 'bcd'],
        featured: true,
        orientation: 'landscape',
        username: USERNAME,
        query: SEARCH_QUERY,
        count: 1,
      }),
    ],
    track: [
      photos.track.handleRequest({
        downloadLocation: 'https://api.unsplash.com/photos/foo123/download',
      }),
    ],
  },
  users: {
    getPhotos: [
      users.getPhotos.handleRequest({ username: USERNAME }),
      users.getPhotos.handleRequest({ username: USERNAME, stats: true, page: 4, perPage: 10 }),
    ],
    getCollections: [users.getCollections.handleRequest({ username: USERNAME })],
    getLikes: [users.getLikes.handleRequest({ username: USERNAME })],
    get: [users.get.handleRequest({ username: USERNAME })],
  },
  search: {
    getCollections: [search.getCollections.handleRequest({ query: SEARCH_QUERY })],
    getPhotos: [
      search.getPhotos.handleRequest({ query: SEARCH_QUERY }),
      search.getPhotos.handleRequest({
        query: SEARCH_QUERY,
        collectionIds: ['a', 'b', 'c'],
        color: 'blue',
        contentFilter: 'high',
        lang: Language.Esperanto,
        orientation: 'portrait',
        orderBy: 'latest',
        page: 123,
        perPage: 4,
      }),
    ],
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
  describe('additional arguments', () => {
    it('Correctly passes down additional args', () => {
      const abortcontroller = new AbortController();
      const signal = abortcontroller.signal;
      const output = photos.getRandom.handleRequest({}, { signal });

      expect(output).toMatchSnapshot();
    });
    it('Correctly merges headers', () => {
      const output = photos.getRandom.handleRequest({}, { headers: { 'test-headers': 'foo' } });

      expect(output).toMatchSnapshot();
    });
  });
});
