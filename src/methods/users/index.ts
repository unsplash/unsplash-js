import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createHandleRequest } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type UserName = {
  username: string;
};

const USERS_PATH_PREFIX = '/users';

export const get = {
  handleRequest: createHandleRequest(({ username }: UserName) => ({
    pathname: `${USERS_PATH_PREFIX}/${username}`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};

export const getPhotos = {
  handleRequest: createHandleRequest(
    ({
      username,
      stats,
      orientation,
      ...paginationParams
    }: {
      stats?: boolean;
    } & OrientationParam &
      UserName &
      PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/photos`,
      query: {
        ...Query.getFeedParams(paginationParams),
        orientation,
        stats,
      },
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getLikes = {
  handleRequest: createHandleRequest(
    ({
      username,
      orientation,
      ...paginationParams
    }: OrientationParam & UserName & PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/likes`,
      query: {
        ...Query.getFeedParams(paginationParams),
        orientation,
      },
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
export const getCollections = {
  handleRequest: createHandleRequest(
    ({ username, ...paginationParams }: UserName & PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/collections`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
