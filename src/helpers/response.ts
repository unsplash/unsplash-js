import { Errors, ErrorSource, getErrorForBadStatusCode, DecodingError } from './errors';
import { getJsonResponse } from './json';

export type ApiResponse<T> =
  | {
      type: 'success';
      response: T;
      originalResponse: Response;
      errors?: never;
      status: number;
    }
  | {
      type: 'error';
      source: ErrorSource;
      response?: never;
      originalResponse: Response;
      errors: Errors;
      status: number;
    };

export type HandleResponse<T> = (args: { response: Response }) => Promise<T>;

export const handleFetchResponse = <ResponseType>(handleResponse: HandleResponse<ResponseType>) => (
  response: Response,
): Promise<ApiResponse<ResponseType>> =>
  (response.ok
    ? handleResponse({ response }).then(
        (handledResponse): ApiResponse<ResponseType> => ({
          type: 'success',
          status: response.status,
          response: handledResponse,
          originalResponse: response,
        }),
      )
    : getJsonResponse(response).then(
        (jsonResponse): ApiResponse<ResponseType> => ({
          type: 'error',
          status: response.status,
          ...getErrorForBadStatusCode(jsonResponse),
          originalResponse: response,
        }),
      )
  ).catch(error => {
    /**
     * We want to separate expected decoding errors from unknown ones. We do so by throwing a custom
     * `DecodingError` whenever we encounter one within `handleFetchResponse` and catch them all
     * here. This allows us to easily handle all of these errors at once. Unexpected errors are not
     * caught, so that they bubble up and fail loudly.
     *
     * Note: Ideally we'd use an Either type, but this does the job without introducing dependencies
     * like `fp-ts`.
     */
    if (error instanceof DecodingError) {
      return {
        type: 'error',
        source: 'decoding',
        status: response.status,
        originalResponse: response,
        errors: [error.message],
      };
    } else {
      throw error;
    }
  });

export const castResponse = <T>(): HandleResponse<T> => ({ response }) =>
  (getJsonResponse(response) as unknown) as Promise<T>;
