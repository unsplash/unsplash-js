import { compactDefined } from '../../helpers/fp';
import { createRequestParams } from '../../helpers/request';
import { OrderBy } from '../../types/request';

export const getPhotos = ({
  collectionId,
  page,
  perPage,
  orderBy,
}: {
  collectionId: string;
  page?: number;
  perPage?: number;
  orderBy?: OrderBy;
}) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/photos`,
    query: compactDefined({
      page,
      per_page: perPage,
      order_by: orderBy,
    }),
  });

export const get = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}`,
  });

export const list = ({ page, perPage }: { page: number; perPage: number }) =>
  createRequestParams({
    pathname: '/collections',
    query: {
      page,
      per_page: perPage,
    },
  });

export const getRelated = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/related`,
  });
