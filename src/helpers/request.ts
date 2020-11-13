import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';
import { flow, compactDefined } from './fp';
import { handleFetchResponse } from './response';
import { OmitStrict } from './typescript';

type BuildUrlParams = {
  pathname: string;
  query?: ParsedUrlQueryInput;
};

const buildUrl = ({ apiUrl }: Required<Pick<InitArguments, 'apiUrl'>>) => ({
  pathname,
  query = {},
}: BuildUrlParams) =>
  flow(
    appendPathnameToUrl(pathname),
    addQueryToUrl(compactDefined(query)),
  )(apiUrl);

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
