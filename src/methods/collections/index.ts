import { createRequestParams } from '../../helpers/request';
import { PaginationParams } from '../../types/request';
import * as Query from '../../helpers/query';
import { castResponse } from '../../helpers/response';
import { handleFeedResponse } from '../../helpers/feed';

type CollectionId = {
  collectionId: string;
};

export const getPhotos = {
  handleRequest: ({
    collectionId,
    ...paginationParams
  }: CollectionId & PaginationParams) =>
    createRequestParams({
      pathname: `/collections/${collectionId}/photos`,
      query: Query.getFeedParams(paginationParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: ({ collectionId }: CollectionId) =>
    createRequestParams({
      pathname: `/collections/${collectionId}`,
    }),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: (
    paginationParams: Pick<PaginationParams, 'page' | 'perPage'>,
  ) =>
    createRequestParams({
      pathname: '/collections',
      query: Query.getFeedParams(paginationParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: ({ collectionId }: CollectionId) =>
    createRequestParams({
      pathname: `/collections/${collectionId}/related`,
    }),
  handleResponse: castResponse<any>(),
};
