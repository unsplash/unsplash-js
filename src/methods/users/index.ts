import { createRequestParams } from '../../helpers/request';
import { Orientation, PaginationParams } from '../../types/request';
import * as Query from '../../helpers/query';

export const getProfile = ({ username }: { username: string }) =>
  createRequestParams({
    pathname: `/users/${username}`,
  });

export const getPhotos = ({
  username,
  stats,
  orientation,
  ...feedParams
}: {
  username: string;
  stats?: boolean;
  orientation: Orientation;
} & PaginationParams) =>
  createRequestParams({
    pathname: `/users/${username}/photos`,
    query: {
      ...Query.getFeedParams(feedParams),
      orientation,
      stats,
    },
  });

export const getLikes = ({
  username,
  orientation,
  ...feedParams
}: { username: string; orientation: Orientation } & PaginationParams) =>
  createRequestParams({
    pathname: `/users/${username}/likes`,
    query: {
      ...Query.getFeedParams(feedParams),
      orientation,
    },
  });

export const getCollections = ({
  username,
  ...feedParams
}: { username: string } & PaginationParams) =>
  createRequestParams({
    pathname: `/users/${username}/collections`,
    query: {
      ...Query.getFeedParams(feedParams),
    },
  });
