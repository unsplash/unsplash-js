import { flow } from './fp';

type Query = {
  [index: string]: string | number | boolean;
};

export type BuildUrlParams = {
  pathname: string;
  query: Query;
};

const addQueryToUrl = (query: Query) => (url: URL) => {
  Object.keys(query).forEach(queryKey =>
    url.searchParams.set(queryKey, query[queryKey].toString()),
  );

  return url;
};

const createUrl = (pathname: string) => (apiUrlBase: string) => new URL(pathname, apiUrlBase);

export const buildUrl = ({ pathname, query }: BuildUrlParams) =>
  flow(createUrl(pathname), addQueryToUrl(query), url => url.toString());

export const parseQueryAndPathname = (url: string) => {
  const { pathname, searchParams } = new URL(url);

  const query: Query = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return { query, pathname: pathname === '/' ? undefined : pathname };
};
