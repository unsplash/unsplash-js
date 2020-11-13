import { compactDefined } from '../../helpers/fp';
import { createRequestParams } from '../../helpers/request';
import { APISearchFilters, ContentFilter, Language } from './types';
import * as Query from '../../helpers/query';
import { PaginationParams } from '../../types/request';

export type SearchParams = {
  query: string;
} & PaginationParams;

export type SearchParamsWithFilters = SearchParams &
  APISearchFilters & {
    lang?: Language;
    contentFilter?: ContentFilter;
    collectionIds?: string[];
  };

export const getPhotos = ({
  query,
  page,
  perPage,
  collectionIds,
  lang,
  contentFilter,
  ...filters
}: SearchParamsWithFilters) =>
  createRequestParams({
    pathname: '/search/photos',
    query: compactDefined({
      query,
      page,
      content_filter: contentFilter,
      lang,
      ...Query.getCollections(collectionIds),
      ...Query.getPerPage(perPage),
      ...filters,
    }),
  });

export const getCollections = ({ query, page, perPage }: SearchParams) =>
  createRequestParams({
    pathname: '/search/collections',
    query: { query, ...Query.getPerPage(perPage), page },
  });

export const getUsers = ({ query, page, perPage }: SearchParams) =>
  createRequestParams({
    pathname: '/search/users',
    query: { query, ...Query.getPerPage(perPage), page },
  });
