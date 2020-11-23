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
type ErrorResponse = {
  errors: Errors;
};

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
  (response: AnyJson): Nullable<ErrorResponse> =>
    checkIsObject(response) && 'errors' in response && checkIsErrors(response.errors)
      ? { errors: response.errors }
      : null,
);

export const getErrorBadStatusCode = (jsonResponse: AnyJson): Errors => {
  if (checkIsApiError(jsonResponse)) {
    return jsonResponse.errors;
  } else {
    return [
      'Responded with a status code outside the 2xx range, and the response body is not recognisable.',
    ];
  }
};
