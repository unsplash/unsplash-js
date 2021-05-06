import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { parseQueryAndPathname } from '../../helpers/url';
import { OrientationParam, PaginationParams } from '../../types/request';
import * as Photo from './types';

type PhotoId = {
  photoId: string;
};

const PHOTOS_PATH_PREFIX = '/photos';

export const list = {
  handleRequest: createRequestHandler((feedParams: PaginationParams = {}) => ({
    pathname: PHOTOS_PATH_PREFIX,
    query: compactDefined(Query.getFeedParams(feedParams)),
  })),
  handleResponse: handleFeedResponse<Photo.Basic>(),
};

export const get = {
  handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}`,
    query: {},
  })),
  handleResponse: castResponse<Photo.Full>(),
};

export const getStats = {
  handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}/statistics`,
    query: {},
  })),
  handleResponse: castResponse<Photo.Stats>(),
};

export const getRandom = {
  handleRequest: createRequestHandler(
    ({
      collectionIds,
      contentFilter,
      ...queryParams
    }: {
      collectionIds?: string[];
      featured?: boolean;
      username?: string;
      query?: string;
      contentFilter?: 'low' | 'high';
      count?: number;
    } & OrientationParam = {}) => ({
      pathname: `${PHOTOS_PATH_PREFIX}/random`,
      query: compactDefined({
        ...queryParams,
        content_filter: contentFilter,
        ...Query.getCollections(collectionIds),
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
};

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
