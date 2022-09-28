import { handleFeedResponse } from '../../helpers/feed';
import { compactDefined, flow } from '../../helpers/fp';
import * as Query from '../../helpers/query';
import { makeEndpoint } from '../../helpers/request';
import { castResponse } from '../../helpers/response';
import { OmitStrict } from '../../helpers/typescript';
import { OrientationParam, PaginationParams } from '../../types/request';
import * as Photo from '../photos/types';
import * as Topic from './types';

export type TopicIdOrSlug = {
  topicIdOrSlug: string;
};

const BASE_TOPIC_PATH = '/topics';
const getTopicPath = ({ topicIdOrSlug }: TopicIdOrSlug) => `${BASE_TOPIC_PATH}/${topicIdOrSlug}`;

export type TopicOrderBy = 'latest' | 'oldest' | 'position' | 'featured';

export const list = makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: ({
    page,
    perPage,
    orderBy,
    topicIdsOrSlugs,
  }: OmitStrict<PaginationParams, 'orderBy'> & {
    /**
     * default: `position`
     */
    orderBy?: TopicOrderBy;
    topicIdsOrSlugs?: string[];
  }) => ({
    pathname: BASE_TOPIC_PATH,
    query: compactDefined({
      ...Query.getFeedParams({ page, perPage }),
      ids: topicIdsOrSlugs?.join(','),
      order_by: orderBy,
    }),
  }),
  handleResponse: handleFeedResponse<Topic.Basic>(),
});

export const get = makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: ({ topicIdOrSlug }: TopicIdOrSlug) => ({
    pathname: getTopicPath({ topicIdOrSlug }),
    query: {},
  }),
  handleResponse: castResponse<Topic.Full>(),
});

export const getPhotos = (() => {
  const getPathname = flow(getTopicPath, topicPath => `${topicPath}/photos`);
  return makeEndpoint({
    getPathname,
    handleRequest: ({
      topicIdOrSlug,
      orientation,
      ...feedParams
    }: TopicIdOrSlug & PaginationParams & OrientationParam) => ({
      pathname: getPathname({ topicIdOrSlug }),
      query: compactDefined({
        ...Query.getFeedParams(feedParams),
        orientation,
      }),
    }),
    handleResponse: handleFeedResponse<Photo.Basic>(),
  });
})();
