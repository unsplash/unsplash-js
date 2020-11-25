import urlHelpers from 'url';
import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';
import { compactDefined, flow } from './fp';

export type BuildUrlParams = {
  pathname: string;
  query: ParsedUrlQueryInput;
};

export const buildUrl = ({ pathname, query }: BuildUrlParams) =>
  flow(appendPathnameToUrl(pathname), addQueryToUrl(compactDefined(query)));

export const parseQueryAndPathname = (url: string) => {
  const { query, pathname } = urlHelpers.parse(url, true);

  return { query, pathname: pathname === '/' ? undefined : pathname };
};
