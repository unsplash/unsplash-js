import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';
import * as User from './types';
import * as Photo from '../photos/types';
import * as Collection from '../collections/types';

type UserName = {
  username: string;
};

const USERS_PATH_PREFIX = '/users';

export const get = {
  handleRequest: createRequestHandler(({ username }: UserName) => ({
    pathname: `${USERS_PATH_PREFIX}/${username}`,
    query: {},
  })),
  handleResponse: castResponse<User.Full>(),
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
  handleResponse: handleFeedResponse<Photo.Basic>(),
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
  handleResponse: handleFeedResponse<Photo.Basic>(),
};
export const getCollections = {
  handleRequest: createRequestHandler(
    ({ username, ...paginationParams }: UserName & PaginationParams) => ({
      pathname: `${USERS_PATH_PREFIX}/${username}/collections`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<Collection.Basic>(),
};
