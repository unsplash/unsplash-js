import { getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';
import { AnyJson } from './typescript';

export const ABORTED = 'aborted' as const;

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
    }
  | { type: 'aborted'; response?: never; errors?: never };

export const handleFetchResponse = (
  responseOrAbort: Response | typeof ABORTED,
): Promise<ApiResponse<AnyJson>> =>
  responseOrAbort === ABORTED
    ? Promise.resolve({
        type: 'aborted',
      })
    : getJsonResponse(responseOrAbort).then(jsonResponse =>
        responseOrAbort.ok
          ? {
              type: 'success',
              status: responseOrAbort.status,
              response: jsonResponse,
            }
          : {
              type: 'error',
              status: responseOrAbort.status,
              errors: getErrorBadStatusCode(jsonResponse),
            },
      );
