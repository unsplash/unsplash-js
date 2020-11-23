import { AnyJson, checkIsString, isDefined, NonEmptyArray } from './typescript';

export type Errors = NonEmptyArray<string>;
type ErrorResponse = {
  errors: Errors;
};

// https://stackoverflow.com/a/8511332
const checkHasErrors = (response: AnyJson): response is { errors: AnyJson } =>
  isDefined(response) && typeof response === 'object' && 'errors' in response;

const checkIsApiError = (response: AnyJson): response is ErrorResponse =>
  checkHasErrors(response) &&
  Array.isArray(response.errors) &&
  response.errors.length > 0 &&
  response.errors.every(checkIsString);

export const getErrorBadStatusCode = (jsonResponse: AnyJson): Errors => {
  if (checkIsApiError(jsonResponse)) {
    return jsonResponse.errors;
  } else {
    return [
      'Responded with a status code outside the 2xx range, and the response body is not recognisable.',
    ];
  }
};
