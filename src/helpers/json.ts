import * as ContentTypeHelpers from 'content-type';
import { DecodingError } from './errors';
import { AnyJson, isDefined } from './typescript';

const checkIsJsonResponse = (response: Response) => {
  const contentTypeHeader = response.headers.get('content-type');

  return (
    isDefined(contentTypeHeader) &&
    ContentTypeHelpers.parse(contentTypeHeader).type === 'application/json'
  );
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
