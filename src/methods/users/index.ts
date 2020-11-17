import { handleFeedResponse } from '../../helpers/feed';
import * as Query from '../../helpers/query';
import { createRequestParams } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OrientationParam, PaginationParams } from '../../types/request';

type UserName = {
  username: string;
};

export const get = {
  handleRequest: createRequestParams(({ username }: UserName) => ({
    pathname: `/users/${username}`,
  })),
  handleResponse: castResponse<any>(),
};

export const getPhotos = {
  handleRequest: createRequestParams(
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
      pathname: `/users/${username}/photos`,
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
  handleRequest: createRequestParams(
    ({
      username,
      orientation,
      ...paginationParams
    }: OrientationParam & UserName & PaginationParams) => ({
      pathname: `/users/${username}/likes`,
      query: {
        ...Query.getFeedParams(paginationParams),
        orientation,
      },
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
export const getCollections = {
  handleRequest: createRequestParams(
    ({ username, ...paginationParams }: UserName & PaginationParams) => ({
      pathname: `/users/${username}/collections`,
      query: Query.getFeedParams(paginationParams),
    }),
  ),
  handleResponse: handleFeedResponse<any>(),
};
