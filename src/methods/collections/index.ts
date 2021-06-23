import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler, makeEndpoint } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type CollectionId = {
  collectionId: string;
};

const COLLECTIONS_PATH_PREFIX = '/collections';

export const getPhotos = (() => {
  const getPathname = ({ collectionId }: CollectionId) =>
    `${COLLECTIONS_PATH_PREFIX}/${collectionId}/photos`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(
      ({
        collectionId,
        orientation,
        ...paginationParams
      }: CollectionId & PaginationParams & OrientationParam) => ({
        pathname: getPathname({ collectionId }),
        query: compactDefined({ ...Query.getFeedParams(paginationParams), orientation }),
      }),
    ),
    handleResponse: handleFeedResponse<any>(),
  });
})();

export const get = (() => {
  const getPathname = ({ collectionId }: CollectionId) =>
    `${COLLECTIONS_PATH_PREFIX}/${collectionId}`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(({ collectionId }: CollectionId) => ({
      pathname: getPathname({ collectionId }),
      query: {},
    })),
    handleResponse: castResponse<any>(),
  });
})();

export const list = (() => {
  const getPathname = () => COLLECTIONS_PATH_PREFIX;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(
      (paginationParams: Pick<PaginationParams, 'page' | 'perPage'> = {}) => ({
        pathname: getPathname(),
        query: Query.getFeedParams(paginationParams),
      }),
    ),
    handleResponse: handleFeedResponse<any>(),
  });
})();

export const getRelated = (() => {
  const getPathname = ({ collectionId }: CollectionId) =>
    `${COLLECTIONS_PATH_PREFIX}/${collectionId}/related`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(({ collectionId }: CollectionId) => ({
      pathname: getPathname({ collectionId }),
      query: {},
    })),
    handleResponse: castResponse<any>(),
  });
})();
