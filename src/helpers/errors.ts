import {
  AnyJson,
  checkIsString,
  getRefinement,
  isDefined,
  checkIsNonEmptyArray,
  JsonMap,
  NonEmptyArray,
  Nullable,
} from './typescript';

export type Errors = NonEmptyArray<string>;
export type ErrorSource = 'api' | 'decoding';

const checkIsObject = getRefinement(
  (response: AnyJson): Nullable<JsonMap> =>
    isDefined(response) && typeof response === 'object' && !Array.isArray(response)
      ? response
      : null,
);

const checkIsErrors = getRefinement(
  (errors: AnyJson): Nullable<Errors> =>
    Array.isArray(errors) && errors.every(checkIsString) && checkIsNonEmptyArray(errors)
      ? errors
      : null,
);

const checkIsApiError = getRefinement(
  (response: AnyJson): Nullable<{ errors: Errors }> =>
    checkIsObject(response) && 'errors' in response && checkIsErrors(response.errors)
      ? { errors: response.errors }
      : null,
);

export const getErrorForBadStatusCode = (
  jsonResponse: AnyJson,
): { errors: Errors; source: ErrorSource } => {
  if (checkIsApiError(jsonResponse)) {
    return { errors: jsonResponse.errors, source: 'api' };
  } else {
    return {
      errors: [
        'Responded with a status code outside the 2xx range, and the response body is not recognisable.',
      ],
      source: 'decoding',
    };
  }
};

export class DecodingError {
  constructor(readonly message: string) {}
}
