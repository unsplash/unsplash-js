import urlHelpers from 'url';
import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestHandler } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { OrientationParam, PaginationParams } from '../../types/request';

type PhotoId = {
  photoId: string;
};

const PHOTOS_PATH_PREFIX = '/photos';

export const list = {
  handleRequest: createRequestHandler((feedParams: PaginationParams = {}) => ({
    pathname: PHOTOS_PATH_PREFIX,
    query: Query.getFeedParams(feedParams),
  })),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}`,
  })),
  handleResponse: castResponse<any>(),
};

export const getStats = {
  handleRequest: createRequestHandler(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}/statistics`,
  })),
  handleResponse: castResponse<any>(),
};

export const getRandom = {
  handleRequest: createRequestHandler(
    ({
      collectionIds,
      ...queryParams
    }: {
      collectionIds?: string[];
      featured?: boolean;
      username?: string;
      query?: string;
      count?: number;
    } & OrientationParam = {}) => ({
      pathname: `${PHOTOS_PATH_PREFIX}/random`,
      query: {
        ...queryParams,
        ...Query.getCollections(collectionIds),
      },
      headers: {
        /**
         * Avoid response caching
         */
        'cache-control': 'no-cache',
      },
    }),
  ),
  handleResponse: castResponse<any>(),
};

export const trackDownload = {
  handleRequest: createRequestHandler(({ downloadLocation }: { downloadLocation: string }) => {
    const { pathname, query } = urlHelpers.parse(downloadLocation, true);

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }
    return { pathname, query };
  }),
  handleResponse: castResponse<any>(),
};
