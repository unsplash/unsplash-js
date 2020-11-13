import parse from 'url-parse';

import { createRequestParams } from '../../helpers/request';
import { compactDefined, OrderBy, Orientation } from '../../helpers/types';

export const listFeed = ({
  page,
  perPage,
  orderBy,
}: {
  page: number;
  perPage: number;
  orderBy: OrderBy;
}) =>
  createRequestParams({
    pathname: `/photos`,
    query: {
      page,
      per_page: perPage,
      order_by: orderBy,
    },
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
  count,
  featured,
  orientation,
  query,
  username,
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
      featured,
      username,
      orientation,
      query,
      count,
      collections: collectionIds ? collectionIds.join() : undefined,
      c: cacheBuster || new Date().getTime(), // Avoid ajax response caching
    }),
  });

const getUrlComponents = (uri: string) => parse(uri, {}, true);

export const track = (photo: any) => {
  const downloadLocation = photo.links.download_location;

  const urlComponents = getUrlComponents(downloadLocation);

  return createRequestParams({
    pathname: urlComponents.pathname,
    query: urlComponents.query,
  });
};
