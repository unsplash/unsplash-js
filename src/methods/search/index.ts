import { createRequestParams } from '../../helpers/request';
import { SearchFilters, ContentFilter, Language } from './types';
import * as Query from '../../helpers/query';
import { PaginationParams } from '../../types/request';
import { castResponse } from '../../helpers/response';

export type SearchParams = {
  query: string;
} & PaginationParams;

export const getPhotos = {
  handleRequest: ({
    query,
    page,
    perPage,
    collectionIds,
    lang,
    contentFilter,
    ...filters
  }: SearchParams &
    SearchFilters & {
      lang?: Language;
      contentFilter?: ContentFilter;
      collectionIds?: string[];
    }) =>
    createRequestParams({
      pathname: '/search/photos',
      query: {
        query,
        content_filter: contentFilter,
        lang,
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
