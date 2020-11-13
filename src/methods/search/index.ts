import { createRequestParams } from '../../helpers/request';
import { compactDefined } from '../../helpers/types';
import { APISearchFilters, ContentFilter, Language } from './types';

export type SearchParams = {
  query: string;
  page: number;
  perPage: number;
};

export type SearchParamsWithFilters = SearchParams &
  APISearchFilters & {
    lang: Language;
    contentFilter: ContentFilter;
    collectionIds: string[];
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
      per_page: perPage,
      content_filter: contentFilter,
      collections: collectionIds ? collectionIds.join() : undefined,
      lang,
      ...filters,
    }),
  });

export const getCollections = ({ query, page, perPage }: SearchParams) =>
  createRequestParams({
    pathname: '/search/collections',
    query: { query, per_page: perPage, page },
  });

export const getUsers = ({ query, page, perPage }: SearchParams) =>
  createRequestParams({
    pathname: '/search/users',
    query: { query, per_page: perPage, page },
  });
