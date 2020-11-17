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

export const list = {
  handleRequest: (feedParams: PaginationParams = {}) =>
    createRequestParams({
      pathname: `/photos`,
      query: Query.getFeedParams(feedParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: ({ photoId }: PhotoId) =>
    createRequestParams({
      pathname: `/photos/${photoId}`,
    }),
  handleResponse: castResponse<any>(),
};

export const getStats = {
  handleRequest: ({ photoId }: PhotoId) =>
    createRequestParams({
      pathname: `/photos/${photoId}/statistics`,
    }),
  handleResponse: castResponse<any>(),
};

const generateCacheBuster = () => new Date().getTime().toString();

export const getRandom = {
  handleRequest: ({
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
  } & OrientationParam = {}) =>
    createRequestParams({
      pathname: '/photos/random',
      query: {
        ...queryParams,
        c: cacheBuster,
        ...Query.getCollections(collectionIds),
      },
    }),
  handleResponse: castResponse<any>(),
};

export const track = {
  handleRequest: ({ downloadLocation }: { downloadLocation: string }) => {
    const { pathname, query } = urlHelpers.parse(downloadLocation, true);

    if (!isDefined(pathname)) {
      throw new Error('Could not parse pathname from url.');
    }
    return createRequestParams({ pathname, query });
  },
  handleResponse: castResponse<any>(),
};
