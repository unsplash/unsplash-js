import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';
import { compactDefined, flow } from './fp';
import {
  ABORTED,
  ApiResponse,
  handleFetchResponse,
  HandleResponse,
} from './response';
import { OmitStrict } from './typescript';

type BuildUrlParams = {
  pathname: string;
  query?: ParsedUrlQueryInput;
};

const buildUrl = ({ pathname, query = {} }: BuildUrlParams) =>
  flow(appendPathnameToUrl(pathname), addQueryToUrl(compactDefined(query)));

type FetchParams = Pick<RequestInit, 'method' | 'body' | 'headers'>;
export type RequestParams = BuildUrlParams & FetchParams;

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

type RequestGenerator<RequestArgs extends unknown[], ResponseType> = {
  handleRequest: (...a: RequestArgs) => RequestParams;
  handleResponse: HandleResponse<ResponseType>;
};

export const initMakeRequest = ({
  accessKey,
  apiVersion = 'v1',
  apiUrl = 'https://api.unsplash.com',
  headers: generalHeaders,
  ...generalFetchOptions
}: InitArguments) => <RequestArgs extends unknown[], ResponseType>({
  handleResponse,
  handleRequest,
}: RequestGenerator<RequestArgs, ResponseType>) =>
  flow(
    handleRequest,
    ({ pathname, query, method = 'GET', headers: endpointHeaders, body }) => {
      const url = buildUrl({ pathname, query })(apiUrl);

      const controller = new AbortController();
      const signal = controller.signal;

      const promise = fetch(url, {
        method,
        headers: {
          ...generalHeaders,
          ...endpointHeaders,
          'Accept-Version': apiVersion,
          Authorization: `Client-ID ${accessKey}`,
        },
        body,
        signal,
        ...generalFetchOptions,
      })
        .catch(err => {
          if (err.name === 'AbortError') {
            return ABORTED;
          } else {
            throw err;
          }
        })
        .then(handleFetchResponse(handleResponse));

      const promiseWithAbort: PromiseWithAbort<ApiResponse<ResponseType>> = {
        ...promise,
        abort: controller.abort,
      };

      return promiseWithAbort;
    },
  );
