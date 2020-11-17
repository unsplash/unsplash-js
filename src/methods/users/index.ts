import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type UserName = {
  username: string;
};

export const get = {
  handleRequest: ({ username }: UserName) =>
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
    ...paginationParams
  }: {
    stats?: boolean;
  } & OrientationParam &
    UserName &
    PaginationParams) =>
    createRequestParams({
      pathname: `/users/${username}/photos`,
      query: {
        ...Query.getFeedParams(paginationParams),
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
    ...paginationParams
  }: OrientationParam & UserName & PaginationParams) =>
    createRequestParams({
      pathname: `/users/${username}/likes`,
      query: {
        ...Query.getFeedParams(paginationParams),
        orientation,
      },
    }),
  handleResponse: handleFeedResponse<any>(),
};
export const getCollections = {
  handleRequest: ({
    username,
    ...paginationParams
  }: UserName & PaginationParams) =>
    createRequestParams({
      pathname: `/users/${username}/collections`,
      query: Query.getFeedParams(paginationParams),
    }),
  handleResponse: handleFeedResponse<any>(),
};
