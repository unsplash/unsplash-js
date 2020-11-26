import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type UserName = {
  username: string;
};

const USERS_PATH_PREFIX = '/users';

export const get = {
  handleRequest: createRequestHandler(({ username }: UserName) => ({
    pathname: `${USERS_PATH_PREFIX}/${username}`,
    query: {},
  })),
  handleResponse: castResponse<any>(),
};

export const getPhotos = {
  handleRequest: createRequestHandler(
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
      query: compactDefined({
        ...Query.getFeedParams(paginationParams),
        orientation,
        stats,
      }),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};

export const getLikes = {
  handleRequest: createRequestHandler(
    ({
      username,
      orientation,
      ...paginationParams
    }: OrientationParam & UserName & PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/likes`,
      query: compactDefined({
        ...Query.getFeedParams(paginationParams),
        orientation,
      }),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
export const getCollections = {
  handleRequest: createRequestHandler(
    ({ username, ...paginationParams }: UserName & PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/collections`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
