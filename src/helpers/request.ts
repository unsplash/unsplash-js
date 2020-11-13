import { pipe } from 'fp-ts/lib/function';
import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';

import { handleFetchResponse } from './response';
import { compactDefined, OmitStrict } from './types';

type BuildUrlParams = {
  pathname: string;
  query?: ParsedUrlQueryInput;
};

const buildUrl = ({ apiUrl }: Required<Pick<InitArguments, 'apiUrl'>>) => ({
  pathname,
  query = {},
}: BuildUrlParams) =>
  pipe(
    apiUrl,
    appendPathnameToUrl(pathname),
    addQueryToUrl(compactDefined(query)),
  );

type FetchParams = Pick<RequestInit, 'method' | 'body' | 'headers'>;
type RequestParams = BuildUrlParams & FetchParams;

/**
 * No-op helper used to type-check the arguments.
 */
export const createRequestParams = (args: RequestParams) => args;

type InitArguments = {
  accessKey: string;
  apiVersion?: string;
  apiUrl?: string;
} & OmitStrict<RequestInit, 'method' | 'body'>;

export const initMakeRequest = ({
  accessKey,
  apiVersion = 'v1',
  apiUrl = 'https://api.unsplash.com',
  headers: generalHeaders,
  ...generalFetchOptions
}: InitArguments) => ({
  pathname,
  query,
  method = 'GET',
  headers: endpointHeaders,
  body,
}: RequestParams) => {
  const url = buildUrl({ apiUrl })({ pathname, query });

  const headers = {
    ...generalHeaders,
    ...endpointHeaders,
    'Accept-Version': apiVersion,
    Authorization: `Client-ID ${accessKey}`,
  };

  const fetchOptions: RequestInit = {
    method,
    headers,
    body,
    ...generalFetchOptions,
  };

  return fetch(url, fetchOptions).then(handleFetchResponse);
};
