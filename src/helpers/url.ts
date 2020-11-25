/**
 * We currently avoid relying on a large library for URL parsing/building to keep bundle size small,
 * and avoid env-specific dependencies such as node's `url` or `URL` (which is not available in IE11).
 *
 * The helpers here do the bare minimum needed to handle use-cases in this library, and might not
 * handle more complex scenarios with edge-cases.
 */

import { parse, stringify } from 'querystringify';
import { compactDefined, flow } from './fp';

type Query = import('querystring').ParsedUrlQueryInput;

const appendPathnameToUrl = (pathnameToAppend: string) => (url: string) =>
  `${url}${pathnameToAppend}`;

const addQueryToUrl = flow(
  (queryToAppend: Query) => compactDefined(queryToAppend),
  query => (url: string) => (Object.keys(query).length === 0 ? url : `${url}?${stringify(query)}`),
);

export type BuildUrlParams = {
  pathname: string;
  query: Query;
};

export const buildUrl = ({ pathname, query }: BuildUrlParams) =>
  flow(appendPathnameToUrl(pathname), addQueryToUrl(query));

/**
 * This is only needed to parse `photo.links.downloadLocation`, which has a fairly consistent pattern.
 * It is not intended to handle very complex scenarios.
 */
export const parseQueryAndPathname = (
  url: string,
): { query: Query; pathname: string | undefined } => {
  const [urlWithoutHash = ''] = url.split('#', 2);

  const [urlWithoutQueryAndHash, queryStr = ''] = urlWithoutHash.split('?', 2);

  const [, hostAndPathname] = urlWithoutQueryAndHash.split('//', 2);
  const [, ...pathnameChunks] = hostAndPathname.split('/');

  const query = parse(queryStr) as Query;
  const pathname = pathnameChunks.length > 0 ? `/${pathnameChunks.join('/')}` : undefined;

  return { query, pathname };
};
