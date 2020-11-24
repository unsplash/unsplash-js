import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createHandleRequest } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type CollectionId = {
  collectionId: string;
};

const COLLECTIONS_PATH_PREFIX = '/collections';

export const getPhotos = {
  handleRequest: createHandleRequest(
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
  handleRequest: createHandleRequest(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}`,
  })),
  handleResponse: castResponse<any>(),
};

export const list = {
  handleRequest: createHandleRequest(
    (paginationParams: Pick<PaginationParams, 'page' | 'perPage'>) => ({
      pathname: COLLECTIONS_PATH_PREFIX,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getRelated = {
  handleRequest: createHandleRequest(({ collectionId }: CollectionId) => ({
    pathname: `${COLLECTIONS_PATH_PREFIX}/${collectionId}/related`,
  })),
  handleResponse: castResponse<any>(),
};
