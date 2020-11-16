import { createRequestParams } from '../../helpers/request';
import { PaginationParams } from '../../types/request';
import * as Query from '../../helpers/query';
import { castResponse } from '../../helpers/response';
import { handleFeedResponse } from '../../helpers/feed';

export const getPhotos = {
  handleRequest: ({
    collectionId,
    ...feedParams
  }: { collectionId: string } & PaginationParams) =>
    createRequestParams({
      pathname: `/collections/${collectionId}/photos`,
      query: Query.getFeedParams(feedParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: ({ collectionId }: { collectionId: string }) =>
    createRequestParams({
      pathname: `/collections/${collectionId}`,
    }),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: (feedParams: Pick<PaginationParams, 'page' | 'perPage'>) =>
    createRequestParams({
      pathname: '/collections',
      query: Query.getFeedParams(feedParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: ({ collectionId }: { collectionId: string }) =>
    createRequestParams({
      pathname: `/collections/${collectionId}/related`,
    }),
  handleResponse: castResponse<any>(),
};
