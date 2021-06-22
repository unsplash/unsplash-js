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

export const get = (() => {
  const getPathname = (username: string) => `${USERS_PATH_PREFIX}/${username}`;
  return {
    getPathname,
    handleRequest: createRequestHandler(({ username }: UserName) => ({
      pathname: getPathname(username),
      query: {},
    })),
    handleResponse: castResponse<User.Full>(),
  };
})();

export const getPhotos = (() => {
  const getPathname = (username: string) => `${USERS_PATH_PREFIX}/${username}/photos`;
  return {
    getPathname,
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
        pathname: getPathname(username),
        query: compactDefined({
          ...Query.getFeedParams(paginationParams),
          orientation,
          stats,
        }),
      }),
    ),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  };
})();

export const getLikes = (() => {
  const getPathname = (username: string) => `${USERS_PATH_PREFIX}/${username}/likes`;
  return {
    getPathname,
    handleRequest: createRequestHandler(
      ({
        username,
        orientation,
        ...paginationParams
      }: OrientationParam & UserName & PaginationParams) => ({
        pathname: getPathname(username),
        query: compactDefined({
          ...Query.getFeedParams(paginationParams),
          orientation,
        }),
      }),
    ),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  };
})();
export const getCollections = (() => {
  const getPathname = (username: string) => `${USERS_PATH_PREFIX}/${username}/collections`;
  return {
    getPathname,
    handleRequest: createRequestHandler(
      ({ username, ...paginationParams }: UserName & PaginationParams) => ({
        pathname: getPathname(username),
        query: Query.getFeedParams(paginationParams),
      }),
    ),
    handleResponse: handleFeedResponse<Collection.Basic>(),
  };
})();
