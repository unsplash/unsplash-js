import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';
import { compactDefined, flow } from './fp';
import { ABORTED, ApiResponse, handleFetchResponse } from './response';
import { AnyJson, OmitStrict } from './typescript';

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

type PromiseWithAbort<T> = Promise<T> & {
  abort: AbortController['abort'];
};

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
}: RequestParams): PromiseWithAbort<ApiResponse<AnyJson>> => {
  const url = buildUrl({ apiUrl })({ pathname, query });

  const headers = {
    ...generalHeaders,
    ...endpointHeaders,
    'Accept-Version': apiVersion,
    Authorization: `Client-ID ${accessKey}`,
  };

  const controller = new AbortController();
  const signal = controller.signal;

  const fetchOptions: RequestInit = {
    method,
    headers,
    body,
    signal,
    ...generalFetchOptions,
  };

  const promise = fetch(url, fetchOptions)
    .catch(err => {
      if (err.name === 'AbortError') {
        return ABORTED;
      } else {
        throw err;
      }
    })
    .then(handleFetchResponse);

  return {
    ...promise,
    abort: controller.abort,
  };
};
