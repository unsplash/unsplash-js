import urlHelpers from 'url';
import * as Query from '../../helpers/query';

import { createRequestParams } from '../../helpers/request';
import { isDefined } from '../../helpers/typescript';
import { Orientation, PaginationParams } from '../../types/request';

export const listFeed = (feedParams: PaginationParams) =>
  createRequestParams({
    pathname: `/photos`,
    query: Query.getFeedParams(feedParams),
  });

export const get = ({ photoId }: { photoId: string }) =>
  createRequestParams({
    pathname: `/photos/${photoId}`,
  });

export const getStats = (id: string) =>
  createRequestParams({
    pathname: `/photos/${id}/statistics`,
  });

export const getRandom = ({
  cacheBuster,
  collectionIds,
  ...queryParams
}: {
  collectionIds?: string[];
  featured?: boolean;
  username?: string;
  orientation?: Orientation;
  query?: string;
  cacheBuster?: string;
  count?: number;
}) =>
  createRequestParams({
    pathname: '/photos/random',
    query: {
      ...queryParams,
      c: cacheBuster || new Date().getTime(), // Avoid ajax response caching
      ...Query.getCollections(collectionIds),
    },
  });

export const track = (photo: { links: { download_location: string } }) => {
  const downloadLocation = photo.links.download_location;

  const { pathname, query } = urlHelpers.parse(downloadLocation, true);

  if (!isDefined(pathname)) {
    throw new Error('Could not parse pathname from url.');
  }

  return createRequestParams({ pathname, query });
};
