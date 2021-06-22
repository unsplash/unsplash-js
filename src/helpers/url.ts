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

const addPathnameToUrl = (pathname: string) => (url: URL) => {
  // When there is no existing pathname, the value is `/`. Appending would give us a URL with two
  // forward slashes. This is why we replace the value in that scenario.
  if (url.pathname === '/') {
    url.pathname = pathname;
  } else {
    url.pathname += pathname;
  }
};

export const buildUrl = ({ pathname, query }: BuildUrlParams) => (apiUrl: string) => {
  const url = new URL(apiUrl);
  addPathnameToUrl(pathname)(url);
  addQueryToUrl(query)(url);
  return url.toString();
};

const getQueryFromSearchParams = (searchParams: URLSearchParams) => {
  const query: Query = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};

export const parseQueryAndPathname = (url: string) => {
  const { pathname, searchParams } = new URL(url);

  const query: Query = getQueryFromSearchParams(searchParams);

  return { query, pathname: pathname === '/' ? undefined : pathname };
};
