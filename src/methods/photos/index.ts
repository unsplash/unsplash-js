import parse from 'url-parse';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';

import { createRequestParams } from '../../helpers/request';
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
    query: compactDefined({
      ...queryParams,
      c: cacheBuster || new Date().getTime(), // Avoid ajax response caching
      ...Query.getCollections(collectionIds),
    }),
  });

const getUrlComponents = (uri: string) => parse(uri, {}, true);

export const track = (photo: { links: { download_location: string } }) => {
  const downloadLocation = photo.links.download_location;

  const urlComponents = getUrlComponents(downloadLocation);

  return createRequestParams({
    pathname: urlComponents.pathname,
    query: urlComponents.query,
  });
};
