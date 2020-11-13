import { createRequestParams } from '../../helpers/request';
import { PaginationParams } from '../../types/request';
import * as Query from '../../helpers/query';

export const getPhotos = ({
  collectionId,
  ...feedParams
}: { collectionId: string } & PaginationParams) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/photos`,
    query: Query.getFeedParams(feedParams),
  });

export const get = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}`,
  });

export const list = (feedParams: Pick<PaginationParams, 'page' | 'perPage'>) =>
  createRequestParams({
    pathname: '/collections',
    query: Query.getFeedParams(feedParams),
  });

export const getRelated = ({ collectionId }: { collectionId: string }) =>
  createRequestParams({
    pathname: `/collections/${collectionId}/related`,
  });
