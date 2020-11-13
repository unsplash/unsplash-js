import { compactDefined } from '../../helpers/fp';
import { createRequestParams } from '../../helpers/request';
import { OrderBy, Orientation } from '../../types/request';

export const getProfile = ({ username }: { username: string }) =>
  createRequestParams({
    pathname: `/users/${username}`,
  });

export const getPhotos = ({
  username,
  page,
  perPage,
  orderBy,
  stats,
  orientation,
}: {
  username: string;
  page: number;
  perPage: number;
  orderBy?: OrderBy;
  stats?: boolean;
  orientation: Orientation;
}) =>
  createRequestParams({
    pathname: `/users/${username}/photos`,
    query: compactDefined({
      page,
      per_page: perPage,
      order_by: orderBy,
      orientation,
      stats,
    }),
  });

export const getLikes = ({
  username,
  page,
  perPage,
  orderBy,
  orientation,
}: {
  username: string;
  page: number;
  perPage: number;
  orderBy?: OrderBy;
  orientation: Orientation;
}) =>
  createRequestParams({
    pathname: `/users/${username}/likes`,
    query: compactDefined({
      page,
      per_page: perPage,
      order_by: orderBy,
      orientation,
    }),
  });

export const getCollections = ({
  username,
  page,
  perPage,
  orderBy,
}: {
  username: string;
  page: number;
  perPage: number;
  orderBy?: OrderBy;
}) =>
  createRequestParams({
    pathname: `/users/${username}/collections`,
    query: {
      page,
      per_page: perPage,
      order_by: orderBy,
    },
  });
