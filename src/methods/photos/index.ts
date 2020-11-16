import urlHelpers from 'url';
import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';

import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { isDefined } from '../../helpers/typescript';
import { Orientation, PaginationParams } from '../../types/request';

export const list = {
  handleRequest: (feedParams: PaginationParams) =>
    createRequestParams({
      pathname: `/photos`,
      query: Query.getFeedParams(feedParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: ({ photoId }: { photoId: string }) =>
    createRequestParams({
      pathname: `/photos/${photoId}`,
    }),
  handleResponse: castResponse<any>(),
};

export const getStats = {
  handleRequest: ({ photoId }: { photoId: string }) =>
    createRequestParams({
      pathname: `/photos/${photoId}/statistics`,
    }),
  handleResponse: castResponse<any>(),
};

export const getRandom = {
  handleRequest: ({
    cacheBuster = new Date().getTime().toString(),
    collectionIds,
    ...queryParams
  }: {
    collectionIds?: string[];
    featured?: boolean;
    username?: string;
    orientation?: Orientation;
    query?: string;
    /**
     * Avoid response caching
     */
    cacheBuster?: string;
    count?: number;
  }) =>
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
