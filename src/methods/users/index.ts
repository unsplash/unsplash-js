import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { Orientation, PaginationParams } from '../../types/request';

export const get = {
  handleRequest: ({ username }: { username: string }) =>
    createRequestParams({
      pathname: `/users/${username}`,
    }),
  handleResponse: castResponse<any>(),
};

export const getPhotos = {
  handleRequest: ({
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
    }),
  handleResponse: handleFeedResponse<any>(),
};

export const getLikes = {
  handleRequest: ({
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
    }),
  handleResponse: handleFeedResponse<any>(),
};
export const getCollections = {
  handleRequest: ({
    username,
    ...feedParams
  }: { username: string } & PaginationParams) =>
    createRequestParams({
      pathname: `/users/${username}/collections`,
      query: Query.getFeedParams(feedParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};
