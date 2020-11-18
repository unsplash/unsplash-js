import urlHelpers from 'url';
import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { OrientationParam, PaginationParams } from '../../types/request';

type PhotoId = {
  photoId: string;
};

const PHOTOS_PATH_PREFIX = '/photos';

export const list = {
  handleRequest: createRequestParams((feedParams: PaginationParams = {}) => ({
    pathname: PHOTOS_PATH_PREFIX,
    query: Query.getFeedParams(feedParams),
  })),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createRequestParams(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}`,
  })),
  handleResponse: castResponse<any>(),
};

export const getStats = {
  handleRequest: createRequestParams(({ photoId }: PhotoId) => ({
    pathname: `${PHOTOS_PATH_PREFIX}/${photoId}/statistics`,
  })),
  handleResponse: castResponse<any>(),
};

const generateCacheBuster = () => new Date().getTime().toString();

export const getRandom = {
  handleRequest: createRequestParams(
    ({
      cacheBuster = generateCacheBuster(),
      collectionIds,
      ...queryParams
    }: {
      collectionIds?: string[];
      featured?: boolean;
      username?: string;
      query?: string;
      /**
       * Avoid response caching
       */
      cacheBuster?: string;
      count?: number;
    } & OrientationParam = {}) => ({
      pathname: `${PHOTOS_PATH_PREFIX}/random`,
      query: {
        ...queryParams,
        c: cacheBuster,
        ...Query.getCollections(collectionIds),
      },
    }),
  ),
  handleResponse: castResponse<any>(),
};

export const track = {
  handleRequest: createRequestParams(({ downloadLocation }: { downloadLocation: string }) => {
    const { pathname, query } = urlHelpers.parse(downloadLocation, true);

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }
    return { pathname, query };
  }),
  handleResponse: castResponse<any>(),
};
