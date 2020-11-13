import { getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';
import { AnyJson } from './typescript';

export const ABORTED = 'aborted' as const;

export type ApiResponse<T> =
  | {
      type: 'response';
      response: T;
      errors: undefined;
      status: number;
    }
  | {
      type: 'error';
      response: undefined;
      errors: string[];
      status: number;
    }
  | { type: 'aborted'; response: undefined; errors: undefined };

export const handleFetchResponse = (
  responseOrAbort: Response | typeof ABORTED,
): Promise<ApiResponse<AnyJson>> =>
  responseOrAbort === ABORTED
    ? Promise.resolve({
        type: 'aborted',
        response: undefined,
        errors: undefined,
      })
    : getJsonResponse(responseOrAbort).then(jsonResponse =>
        responseOrAbort.ok
          ? {
              type: 'response',
              status: responseOrAbort.status,
              response: jsonResponse,
              errors: undefined,
            }
          : {
              type: 'error',
              status: responseOrAbort.status,
              errors: getErrorBadStatusCode(jsonResponse),
              response: undefined,
            },
      );
