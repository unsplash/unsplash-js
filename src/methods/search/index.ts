import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';
import { ColorId, ContentFilter, Language, SearchOrderBy } from './types';

export type SearchParams = {
  query: string;
} & Pick<PaginationParams, 'page' | 'perPage'>;

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
  handleRequest: ({
    query,
    page,
    perPage,
    orderBy,
    collectionIds,
    lang,
    contentFilter,
    ...filters
  }: SearchPhotosParams) =>
    createRequestParams({
      pathname: '/search/photos',
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
  handleResponse: castResponse<any>(),
};

export const getCollections = {
  handleRequest: ({ query, ...paginationParams }: SearchParams) =>
    createRequestParams({
      pathname: '/search/collections',
      query: { query, ...Query.getFeedParams(paginationParams) },
    }),
  handleResponse: castResponse<any>(),
};

export const getUsers = {
  handleRequest: ({ query, ...paginationParams }: SearchParams) =>
    createRequestParams({
      pathname: '/search/users',
      query: { query, ...Query.getFeedParams(paginationParams) },
    }),
  handleResponse: castResponse<any>(),
};
