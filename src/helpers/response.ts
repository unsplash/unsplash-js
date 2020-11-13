import { getErrorBadStatusCode } from './errors';
import { getJsonResponse } from './json';
import { AnyJson } from './types';

type ResponseOrError<T> =
  | { response: T; errors: undefined }
  | { response: undefined; errors: string[] };

export const handleFetchResponse = (
  response: Response,
): Promise<ResponseOrError<AnyJson>> =>
  getJsonResponse(response).then(
    (jsonResponse): ResponseOrError<AnyJson> =>
      response.ok
        ? {
            response: jsonResponse,
            errors: undefined,
          }
        : {
            response: undefined,
            errors: getErrorBadStatusCode(jsonResponse),
          },
  );
