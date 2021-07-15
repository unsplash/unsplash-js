import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler, makeEndpoint } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { parseQueryAndPathname } from '../../helpers/url';
import { OrientationParam, PaginationParams } from '../../types/request';
import * as Photo from './types';

type PhotoId = {
  photoId: string;
};

const PHOTOS_PATH_PREFIX = '/photos';

export const list = (() => {
  const getPathname = () => PHOTOS_PATH_PREFIX;
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: (_params?: void) => getPathname(),
    handleRequest: createRequestHandler((feedParams: PaginationParams = {}) => ({
      pathname: PHOTOS_PATH_PREFIX,
      query: compactDefined(Query.getFeedParams(feedParams)),
    })),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  });
})();

export const get = (() => {
  const getPathname = ({ photoId }: PhotoId) => `${PHOTOS_PATH_PREFIX}/${photoId}`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
      pathname: getPathname({ photoId }),
      query: {},
    })),
    handleResponse: castResponse<Photo.Full>(),
  });
})();

export const getStats = (() => {
  const getPathname = ({ photoId }: PhotoId) => `${PHOTOS_PATH_PREFIX}/${photoId}/statistics`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
      pathname: getPathname({ photoId }),
      query: {},
    })),
    handleResponse: castResponse<Photo.Stats>(),
  });
})();

export type RandomParams = {
  collectionIds?: string[];
  topicIds?: string[];
  featured?: boolean;
  username?: string;
  query?: string;
  contentFilter?: 'low' | 'high';
  count?: number;
} & OrientationParam;

export const getRandom = (() => {
  const getPathname = () => `${PHOTOS_PATH_PREFIX}/random`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(
      ({ collectionIds, contentFilter, topicIds, ...queryParams }: RandomParams = {}) => ({
        pathname: getPathname(),
        query: compactDefined({
          ...queryParams,
          content_filter: contentFilter,
          ...Query.getCollections(collectionIds),
          ...Query.getTopics(topicIds),
        }),
        headers: {
          /**
           * Avoid response caching
           */
          'cache-control': 'no-cache',
        },
      }),
    ),
    handleResponse: castResponse<
      // An array when the `count` query parameter is used.
      Photo.Random | Photo.Random[]
    >(),
  });
})();

export const trackDownload = {
  handleRequest: createRequestHandler(({ downloadLocation }: { downloadLocation: string }) => {
    const { pathname, query } = parseQueryAndPathname(downloadLocation);

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }
    return { pathname, query: compactDefined(query) };
  }),
  handleResponse: castResponse<{ url: string }>(),
};
