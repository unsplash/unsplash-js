import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { createRequestHandler, makeEndpoint } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';
import * as User from './types';
import * as Photo from '../photos/types';
import * as Collection from '../collections/types';

type Username = {
  username: string;
};

const USERS_PATH_PREFIX = '/users';

export const get = (() => {
  const getPathname = ({ username }: Username) => `${USERS_PATH_PREFIX}/${username}`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(({ username }: Username) => ({
      pathname: getPathname({ username }),
      query: {},
    })),
    handleResponse: castResponse<User.Full>(),
  });
})();

export const getPhotos = (() => {
  const getPathname = ({ username }: Username) => `${USERS_PATH_PREFIX}/${username}/photos`;
  return makeEndpoint({
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
        Username &
        PaginationParams) => ({
        pathname: getPathname({ username }),
        query: compactDefined({
          ...Query.getFeedParams(paginationParams),
          orientation,
          stats,
        }),
      }),
    ),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  });
})();

export const getLikes = (() => {
  const getPathname = ({ username }: Username) => `${USERS_PATH_PREFIX}/${username}/likes`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(
      ({
        username,
        orientation,
        ...paginationParams
      }: OrientationParam & Username & PaginationParams) => ({
        pathname: getPathname({ username }),
        query: compactDefined({
          ...Query.getFeedParams(paginationParams),
          orientation,
        }),
      }),
    ),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  });
})();
export const getCollections = (() => {
  const getPathname = ({ username }: Username) => `${USERS_PATH_PREFIX}/${username}/collections`;
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(
      ({ username, ...paginationParams }: Username & PaginationParams) => ({
        pathname: getPathname({ username }),
        query: Query.getFeedParams(paginationParams),
      }),
    ),
    handleResponse: handleFeedResponse<Collection.Basic>(),
  });
})();
