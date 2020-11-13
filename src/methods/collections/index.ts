import { compactDefined } from '../../helpers/fp';
import { createRequestParams } from '../../helpers/request';
import { OrderBy, PaginationParams } from '../../types/request';
import * as Query from '../../helpers/query';

export const getPhotos = ({
  collectionId,
  page,
  perPage,
  orderBy,
}: {
  collectionId: string;
  orderBy?: OrderBy;
} & PaginationParams) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/photos`,
    query: compactDefined({
      page,
      ...Query.getPerPage(perPage),
      ...Query.getOrderBy(orderBy),
    }),
  });

export const get = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}`,
  });

export const list = ({ page, perPage }: PaginationParams) =>
  createRequestParams({
    pathname: '/collections',
    query: {
      page,
      ...Query.getPerPage(perPage),
    },
  });

export const getRelated = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/related`,
  });
