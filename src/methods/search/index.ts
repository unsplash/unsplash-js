import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';
import { ColorId, ContentFilter, Language, SearchOrderBy } from './types';

export type SearchParams = {
  query: string;
} & Pick<PaginationParams, 'page' | 'perPage'>;

const SEARCH_PATH_PREFIX = `/search`;

type SearchPhotosParams = SearchParams &
  OrientationParam & {
    /**
     * API defaults to `relevant` if no value is provided
     */
    orderBy?: SearchOrderBy;
    color?: ColorId;
    lang?: Language;
    contentFilter?: ContentFilter;
    collectionIds?: string[];
  };

export const getPhotos = {
  handleRequest: createRequestParams(
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
      query: {
        query,
        content_filter: contentFilter,
        lang,
        order_by: orderBy,
        ...Query.getFeedParams({ page, perPage }),
        ...Query.getCollections(collectionIds),
        ...filters,
      },
    }),
  ),
  handleResponse: castResponse<any>(),
};

export const getCollections = {
  handleRequest: createRequestParams(({ query, ...paginationParams }: SearchParams) => ({
    pathname: `${SEARCH_PATH_PREFIX}/collections`,
    query: { query, ...Query.getFeedParams(paginationParams) },
  })),
  handleResponse: castResponse<any>(),
};

export const getUsers = {
  handleRequest: createRequestParams(({ query, ...paginationParams }: SearchParams) => ({
    pathname: `${SEARCH_PATH_PREFIX}/users`,
    query: { query, ...Query.getFeedParams(paginationParams) },
  })),
  handleResponse: castResponse<any>(),
};
