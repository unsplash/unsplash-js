import { getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';
import { AnyJson } from './typescript';

export type ApiResponse<T> =
  | {
      type: 'success';
      response: T;
      errors?: never;
      status: number;
    }
  | {
      type: 'error';
      response?: never;
      errors: string[];
      status: number;
    };

export type HandleResponse<T> = (args: { response: Response; jsonResponse: AnyJson }) => T;

export const handleFetchResponse = <ResponseType>(handleResponse: HandleResponse<ResponseType>) => (
  response: Response,
): Promise<ApiResponse<ResponseType>> =>
  getJsonResponse(response).then(
    (jsonResponse): ApiResponse<ResponseType> =>
      response.ok
        ? {
            type: 'success',
            status: response.status,
            response: handleResponse({ response, jsonResponse }),
          }
        : {
            type: 'error',
            status: response.status,
            errors: getErrorBadStatusCode(jsonResponse),
          },
  );

export const castResponse = <T>(): HandleResponse<T> => ({ jsonResponse }) =>
  (jsonResponse as unknown) as T;
