import urlHelpers from 'url';
import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createHandleRequest } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { OrientationParam, PaginationParams } from '../../types/request';

type PhotoId = {
  photoId: string;
};

const PHOTOS_PATH_PREFIX = '/photos';

export const list = {
  handleRequest: createHandleRequest((feedParams: PaginationParams = {}) => ({
    pathname: PHOTOS_PATH_PREFIX,
    query: Query.getFeedParams(feedParams),
  })),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createHandleRequest(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};

export const getStats = {
  handleRequest: createHandleRequest(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}/statistics`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};

export const getRandom = {
  handleRequest: createHandleRequest(
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
  handleRequest: createHandleRequest(({ downloadLocation }: { downloadLocation: string }) => {
    const { pathname, query } = urlHelpers.parse(downloadLocation, true);

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }
    return { pathname, query };
  }),
  handleResponse: castResponse<any>(),
};
