import urlHelpers from 'url';
import * as Query from '../../helpers/query';

import { createRequestParams } from '../../helpers/request';
import { isDefined } from '../../helpers/typescript';
import { Orientation, PaginationParams } from '../../types/request';

export const list = (feedParams: PaginationParams) =>
  createRequestParams({
    pathname: `/photos`,
    query: Query.getFeedParams(feedParams),
  });

export const get = ({ photoId }: { photoId: string }) =>
  createRequestParams({
    pathname: `/photos/${photoId}`,
  });

export const getStats = ({ photoId }: { photoId: string }) =>
  createRequestParams({
    pathname: `/photos/${photoId}/statistics`,
  });

export const getRandom = ({
  cacheBuster = new Date().getTime().toString(),
  collectionIds,
  ...queryParams
}: {
  collectionIds?: string[];
  featured?: boolean;
  username?: string;
  orientation?: Orientation;
  query?: string;
  /**
   * Avoid response caching
   */
  cacheBuster?: string;
  count?: number;
}) =>
  createRequestParams({
    pathname: '/photos/random',
    query: {
      ...queryParams,
      c: cacheBuster,
      ...Query.getCollections(collectionIds),
    },
  });

export const track = ({ downloadLocation }: { downloadLocation: string }) => {
  const { pathname, query } = urlHelpers.parse(downloadLocation, true);

  if (!isDefined(pathname)) {
    throw new Error('Could not parse pathname from url.');
  }

  return createRequestParams({ pathname, query });
};
