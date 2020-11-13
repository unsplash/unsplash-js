import { PaginationParams } from '../types/request';
import { isDefined, ValidateShape } from './typescript';

export const getCollections = (collectionIds?: string[]) =>
  isDefined(collectionIds) ? { collections: collectionIds.join() } : {};

export const getFeedParams = <T>({
  page,
  perPage,
  orderBy,
}: ValidateShape<T, PaginationParams>) => ({
  per_page: perPage,
  order_by: orderBy,
  page,
});
