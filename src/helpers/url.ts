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
};

export const buildUrl = ({ pathname, query }: BuildUrlParams) => (apiBaseUrl: string) => {
  const url = new URL(pathname, apiBaseUrl);
  addQueryToUrl(query)(url);
  return url.toString();
};

export const parseQueryAndPathname = (url: string) => {
  const { pathname, searchParams } = new URL(url);

  const query: Query = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return { query, pathname: pathname === '/' ? undefined : pathname };
};
