import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';
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

export const getPhotos = {
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
      pathname: `${SEARCH_PATH_PREFIX}/photos`,
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
};

export const getCollections = {
  handleRequest: createRequestHandler(({ query, ...paginationParams }: SearchParams) => ({
    pathname: `${SEARCH_PATH_PREFIX}/collections`,
    query: { query, ...Query.getFeedParams(paginationParams) },
  })),
  handleResponse: castResponse<SearchResponse.Collections>(),
};

export const getUsers = {
  handleRequest: createRequestHandler(({ query, ...paginationParams }: SearchParams) => ({
    pathname: `${SEARCH_PATH_PREFIX}/users`,
    query: { query, ...Query.getFeedParams(paginationParams) },
  })),
  handleResponse: castResponse<SearchResponse.Users>(),
};
