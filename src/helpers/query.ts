import { PaginationParams } from '../types/request';
import { compactDefined } from './fp';
import { isDefined } from './typescript';

export const getCollections = (collectionIds?: string[]) =>
  isDefined(collectionIds) ? { collections: collectionIds.join() } : {};

export const getTopics = (topicIds?: string[]) =>
  isDefined(topicIds) ? { topics: topicIds.join() } : {};

export const getFeedParams = ({ page, perPage, orderBy }: PaginationParams) =>
  compactDefined({
    per_page: perPage,
    order_by: orderBy,
    page,
  });
