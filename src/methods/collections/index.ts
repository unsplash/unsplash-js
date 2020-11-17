import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { PaginationParams } from '../../types/request';

type CollectionId = {
  collectionId: string;
};

export const getPhotos = {
  handleRequest: createRequestParams(
    ({
      collectionId,
      ...paginationParams
    }: CollectionId & PaginationParams) => ({
      pathname: `/collections/${collectionId}/photos`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createRequestParams(({ collectionId }: CollectionId) => ({
    pathname: `/collections/${collectionId}`,
  })),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: createRequestParams(
    (paginationParams: Pick<PaginationParams, 'page' | 'perPage'>) => ({
      pathname: '/collections',
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: createRequestParams(({ collectionId }: CollectionId) => ({
    pathname: `/collections/${collectionId}/related`,
  })),
  handleResponse: castResponse<any>(),
};
