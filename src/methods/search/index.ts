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
    query: {
      query,
      content_filter: contentFilter,
      lang,
      ...Query.getFeedParams({ page, perPage }),
      ...Query.getCollections(collectionIds),
      ...filters,
    },
  });

export const getCollections = ({ query, ...feedParams }: SearchParams) =>
  createRequestParams({
    pathname: '/search/collections',
    query: { query, ...Query.getFeedParams(feedParams) },
  });

export const getUsers = ({ query, ...feedParams }: SearchParams) =>
  createRequestParams({
    pathname: '/search/users',
    query: { query, ...Query.getFeedParams(feedParams) },
  });
