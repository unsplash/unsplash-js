import { PaginationParams } from '../types/request';
import { isDefined } from './typescript';

export const getCollections = (collectionIds?: string[]) =>
  isDefined(collectionIds) ? { collections: collectionIds.join() } : {};

export const getFeedParams = ({ page, perPage, orderBy }: PaginationParams) => ({
  per_page: perPage,
  order_by: orderBy,
  page,
});
