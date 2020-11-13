import { getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';
import { AnyJson } from './typescript';

type CommonProps = { status: number };

type ResponseOrError<T> = CommonProps &
  (
    | { type: 'response'; response: T; errors: undefined }
    | { type: 'error'; response: undefined; errors: string[] }
  );

export const handleFetchResponse = (
  response: Response,
): Promise<ResponseOrError<AnyJson>> =>
  getJsonResponse(response).then(
    (jsonResponse): ResponseOrError<AnyJson> =>
      response.ok
        ? {
            type: 'response',
            status: response.status,
            response: jsonResponse,
            errors: undefined,
          }
        : {
            type: 'error',
            status: response.status,
            errors: getErrorBadStatusCode(jsonResponse),
            response: undefined,
          },
  );
