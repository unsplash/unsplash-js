import { CompleteRequestParams } from '../src/helpers/request';
import * as collections from '../src/methods/collections';
import * as photos from '../src/methods/photos';
import * as search from '../src/methods/search';
import * as users from '../src/methods/users';
import * as topics from '../src/methods/topics';
import { createApi } from '../src';
import { OrderBy } from '../src/types/request';
import { Language } from '../src/methods/search/types/request';
import { buildUrl, parseQueryAndPathname } from '../src/helpers/url';

describe('parseQueryAndPathname', () => {
  it('parses full URL correctly', () => {
    const output = parseQueryAndPathname(
      'https://api.unsplash.com/photos/foo123/download?foo=bar&baz=123#some-hash',
    );
    expect(output).toMatchSnapshot();
  });
  it('handles no hash correctly', () => {
    const output = parseQueryAndPathname(
      'https://api.unsplash.com/photos/foo123/download?foo=bar&baz=123',
    );
    expect(output).toMatchSnapshot();
  });

  it('handles hash without query correctly', () => {
    const output = parseQueryAndPathname(
      'https://api.unsplash.com/photos/foo123/download#some-hash',
    );
    expect(output).toMatchSnapshot();
  });

  it('handles no hash or query correctly', () => {
    const output = parseQueryAndPathname('https://api.unsplash.com/photos/foo123/download');
    expect(output).toMatchSnapshot();
  });

  it('handles query with only undefined properties correctly', () => {
    const output = parseQueryAndPathname('https://api.unsplash.com');
    expect(output).toMatchSnapshot();
  });
});

describe('buildUrl', () => {
  it('works with apiUrl (without path)', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: { a: 1, b: 2 } })('https://example.com');
    expect(output).toEqual('https://example.com/foo/bar?a=1&b=2');
  });

  it('works with apiUrl (with path)', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: { a: 1, b: 2 } })(
      'https://example.com/baz',
    );
    expect(output).toEqual('https://example.com/baz/foo/bar?a=1&b=2');
  });

  it('handles empty query correctly', () => {
    const output = buildUrl({ pathname: '/foo/bar', query: {} })('https://example.com');
    expect(output).toEqual('https://example.com/foo/bar');
  });
});

const PHOTO_ID = 'abc123';
const USERNAME = 'usernametest';
const SEARCH_QUERY = 'cat';
const COLLECTION_ID = 'collection123';
const TOPIC_ID_OR_SLUG = 'topic123';

type Api = ReturnType<typeof createApi>;
type Section = keyof Api;
const paramsTests: { [S in Section]: Record<keyof Api[S], CompleteRequestParams[]> } = {
  photos: {
    get: [photos.get.handleRequest({ photoId: PHOTO_ID })],
    list: [
      photos.list.handleRequest({ orderBy: OrderBy.LATEST, page: 4, perPage: 10 }),
      photos.list.handleRequest({ orderBy: OrderBy.LATEST }),
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
    trackDownload: [
      photos.trackDownload.handleRequest({
        downloadLocation: 'https://api.unsplash.com/photos/foo123/download',
      }),
      photos.trackDownload.handleRequest({
        downloadLocation:
          'https://api.unsplash.com/photos/foo123/download?foo=bar&baz=123#some-hash',
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
    getPhotos: [
      collections.getPhotos.handleRequest({ collectionId: COLLECTION_ID }),
      collections.getPhotos.handleRequest({
        collectionId: COLLECTION_ID,
        orientation: 'landscape',
      }),
    ],
    get: [collections.get.handleRequest({ collectionId: COLLECTION_ID })],
    list: [
      collections.list.handleRequest({}),
      collections.list.handleRequest({ page: 8, perPage: 23 }),
    ],
    getRelated: [collections.getRelated.handleRequest({ collectionId: COLLECTION_ID })],
  },
  topics: {
    get: [topics.get.handleRequest({ topicIdOrSlug: TOPIC_ID_OR_SLUG })],
    getPhotos: [
      topics.getPhotos.handleRequest({
        topicIdOrSlug: TOPIC_ID_OR_SLUG,
      }),
      topics.getPhotos.handleRequest({
        topicIdOrSlug: TOPIC_ID_OR_SLUG,
        orientation: 'portrait',
        page: 123,
        perPage: 4,
        orderBy: OrderBy.LATEST,
      }),
    ],
    list: [
      topics.list.handleRequest({}),
      topics.list.handleRequest({
        orderBy: 'position',
        topicIdsOrSlugs: [TOPIC_ID_OR_SLUG],
        page: 2,
        perPage: 13,
      }),
    ],
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
