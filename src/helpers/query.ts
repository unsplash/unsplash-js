import { OrderBy } from '../types/request';
import { isDefined } from './typescript';

export const getCollections = (collectionIds?: string[]) =>
  isDefined(collectionIds) ? { collections: collectionIds.join() } : {};

export const getPerPage = (perPage?: number) => ({
  per_page: perPage,
});

export const getOrderBy = (orderBy?: OrderBy) => ({
  order_by: orderBy,
});
