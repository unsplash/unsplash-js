import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestHandler, createRequestHandlerOptional } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type CollectionId = {
  collectionId: string;
};

const COLLECTIONS_PATH_PREFIX = '/collections';

export const getPhotos = {
  handleRequest: createRequestHandler(
    ({
      collectionId,
      orientation,
      ...paginationParams
    }: CollectionId & PaginationParams & OrientationParam) => ({
      pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}/photos`,
      query: { ...Query.getFeedParams(paginationParams), orientation },
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const get = {
  handleRequest: createRequestHandler(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: createRequestHandlerOptional(
    (paginationParams: Pick<PaginationParams, 'page' | 'perPage'> = {}) => ({
      pathname: COLLECTIONS_PATH_PREFIX,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: createRequestHandler(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}/related`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};
