import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler, makeEndpoint } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams, Plus } from '../../types/request';
import { ColorId, ContentFilter, Language, SearchOrderBy } from './types/request';
import * as SearchResponse from './types/response';

export type SearchParams = {
  query: string;
} & Pick<PaginationParams, 'page' | 'perPage'>;

const SEARCH_PATH_PREFIX = `/search`;

type SearchPhotosParams = SearchParams &
  OrientationParam & {
    /**
     * API defaults to `"relevant"` if no value is provided
     */
    orderBy?: SearchOrderBy;
    color?: ColorId;
    plus?: Plus;
    /**
     * API defaults to `en` (English) if no value is provided
     */
    lang?: Language;
    /**
     * API defaults to `"low"` if no value is provided
     */
    contentFilter?: ContentFilter;
    collectionIds?: string[];
  };

export const getPhotos = (() => {
  const getPathname = () => `${SEARCH_PATH_PREFIX}/photos`;
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: (_params?: void) => getPathname(),
    handleRequest: createRequestHandler(
      ({
        query,
        page,
        perPage,
        orderBy,
        collectionIds,
        lang,
        contentFilter,
        ...filters
      }: SearchPhotosParams) => ({
        pathname: getPathname(),
        query: compactDefined({
          query,
          content_filter: contentFilter,
          lang,
          order_by: orderBy,
          ...Query.getFeedParams({ page, perPage }),
          ...Query.getCollections(collectionIds),
          ...filters,
        }),
      }),
    ),
    handleResponse: castResponse<SearchResponse.Photos>(),
  });
})();

export const getCollections = (() => {
  const getPathname = () => `${SEARCH_PATH_PREFIX}/collections`;
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: (_params?: void) => getPathname(),
    handleRequest: createRequestHandler(({ query, ...paginationParams }: SearchParams) => ({
      pathname: getPathname(),
      query: { query, ...Query.getFeedParams(paginationParams) },
    })),
    handleResponse: castResponse<SearchResponse.Collections>(),
  });
})();

export const getUsers = (() => {
  const getPathname = () => `${SEARCH_PATH_PREFIX}/users`;
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: (_params?: void) => getPathname(),
    handleRequest: createRequestHandler(({ query, ...paginationParams }: SearchParams) => ({
      pathname: getPathname(),
      query: { query, ...Query.getFeedParams(paginationParams) },
    })),
    handleResponse: castResponse<SearchResponse.Users>(),
  });
})();
