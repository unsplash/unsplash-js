import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { PaginationParams } from '../../types/request';

type CollectionId = {
  collectionId: string;
};

const COLLECTIONS_PATH_PREFIX = '/collections';

export const getPhotos = {
  handleRequest: createRequestParams(
    ({ collectionId, ...paginationParams }: CollectionId & PaginationParams) => ({
      pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}/photos`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createRequestParams(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}`,
  })),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: createRequestParams(
    (paginationParams: Pick<PaginationParams, 'page' | 'perPage'>) => ({
      pathname: COLLECTIONS_PATH_PREFIX,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: createRequestParams(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}/related`,
  })),
  handleResponse: castResponse<any>(),
};
