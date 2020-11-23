import { Errors, getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';

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
      errors: Errors;
      status: number;
    };

export type HandleResponse<T> = (args: { response: Response }) => Promise<T>;

export const handleFetchResponse = <ResponseType>(handleResponse: HandleResponse<ResponseType>) => (
  response: Response,
): Promise<ApiResponse<ResponseType>> =>
  response.ok
    ? handleResponse({ response }).then(
        (handledResponse): ApiResponse<ResponseType> => ({
          type: 'success',
          status: response.status,
          response: handledResponse,
        }),
      )
    : getJsonResponse(response).then(
        (jsonResponse): ApiResponse<ResponseType> => ({
          type: 'error',
          status: response.status,
          errors: getErrorBadStatusCode(jsonResponse),
        }),
      );

export const castResponse = <T>(): HandleResponse<T> => ({ response }) =>
  (getJsonResponse(response) as unknown) as Promise<T>;
