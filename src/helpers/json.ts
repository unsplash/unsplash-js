import { DecodingError } from './errors';
import { AnyJson, isDefined } from './typescript';

// Regex from: https://stackoverflow.com/a/73613161
const isJSON = (contentType: string): boolean =>
  /application\/[^+]*[+]?(json);?.*/.test(contentType);

const checkIsJsonResponse = (response: Response): boolean => {
  const contentTypeHeader = response.headers.get('content-type');

  return isDefined(contentTypeHeader) && isJSON(contentTypeHeader);
};

/**
 * Note: restrict the type of JSON to `AnyJson` so that `any` doesn't leak downstream.
 */
export const getJsonResponse = (response: Response): Promise<AnyJson> => {
  if (checkIsJsonResponse(response)) {
    return response.json().catch(_err => {
      throw new DecodingError('unable to parse JSON response.');
    });
  } else {
    throw new DecodingError('expected JSON response from server.');
  }
};
