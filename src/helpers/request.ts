import { ParsedUrlQueryInput } from 'querystring';
import { addQueryToUrl, appendPathnameToUrl } from 'url-transformers';
import { compactDefined, flow } from './fp';
import { ApiResponse, handleFetchResponse, HandleResponse } from './response';
import { OmitStrict } from './typescript';

type BuildUrlParams = {
  pathname: string;
  query?: ParsedUrlQueryInput;
};

const buildUrl = ({ pathname, query = {} }: BuildUrlParams) =>
  flow(appendPathnameToUrl(pathname), addQueryToUrl(compactDefined(query)));

type FetchParams = Pick<RequestInit, 'method' | 'body' | 'headers'>;
export type RequestParams = BuildUrlParams & FetchParams;

type AdditionalFetchOptions = Omit<RequestInit, keyof FetchParams>;
type CompleteRequestParams = RequestParams & AdditionalFetchOptions;
/**
 * helper used to type-check the arguments, and add default params for all requests
 */
export const createRequestParams = <Args extends {}>(
  fn: (a: Args) => RequestParams,
) => (
  a: Args,
  additionalFetchOptions: AdditionalFetchOptions = {},
): CompleteRequestParams => ({
  ...fn(a),
  ...additionalFetchOptions,
});

type InitArguments = {
  accessKey: string;
  apiVersion?: string;
  apiUrl?: string;
} & OmitStrict<RequestInit, 'method' | 'body'>;

type RequestGenerator<RequestArgs extends unknown[], ResponseType> = {
  handleRequest: (...a: RequestArgs) => CompleteRequestParams;
  handleResponse: HandleResponse<ResponseType>;
};

type InitMakeRequest = (
  args: InitArguments,
) => <RequestArgs extends unknown[], ResponseType>(
  handlers: RequestGenerator<RequestArgs, ResponseType>,
) => (
  ...a: Parameters<typeof handlers['handleRequest']>
) => Promise<ApiResponse<ResponseType>>;

export const initMakeRequest: InitMakeRequest = ({
  accessKey,
  apiVersion = 'v1',
  apiUrl = 'https://api.unsplash.com',
  headers: generalHeaders,
  ...generalFetchOptions
}) => ({ handleResponse, handleRequest }) =>
  flow(
    handleRequest,
    ({
      pathname,
      query,
      method = 'GET',
      headers: endpointHeaders,
      body,
      signal,
    }) => {
      const url = buildUrl({ pathname, query })(apiUrl);

      const fetchOptions: RequestInit = {
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
      };

      return fetch(url, fetchOptions).then(handleFetchResponse(handleResponse));
    },
  );
