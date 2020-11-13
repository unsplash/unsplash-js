import { AnyJson, checkIsString } from './typescript';

type ErrorResponse = {
  errors: string[];
};

// https://stackoverflow.com/a/8511332
const checkHasErrors = (response: AnyJson): response is { errors: AnyJson } =>
  typeof response === 'object' && response !== null && 'errors' in response;

const checkIsApiError = (response: AnyJson): response is ErrorResponse =>
  checkHasErrors(response) &&
  Array.isArray(response.errors) &&
  response.errors.every(checkIsString);

export const getErrorBadStatusCode = (jsonResponse: AnyJson) => {
  if (checkIsApiError(jsonResponse)) {
    return jsonResponse.errors;
  } else {
    return [
      'Responded with a status code outside the 2xx range, and the response body is not recognisable.',
    ];
  }
};
