import * as ContentTypeHelpers from 'content-type';
import { AnyJson } from './typescript';

const CONTENT_TYPE_RESPONSE_HEADER = 'content-type';
const CONTENT_TYPE_JSON = 'application/json';
const checkIsJsonResponse = (response: Response) => {
  const contentTypeHeader = response.headers.get(CONTENT_TYPE_RESPONSE_HEADER);

  return (
    contentTypeHeader !== null &&
    ContentTypeHelpers.parse(contentTypeHeader).type === CONTENT_TYPE_JSON
  );
};

/**
 * Note: restrict the type of JSON to `AnyJson` so that `any` doesn't leak downstream.
 */
export const getJsonResponse = (response: Response): Promise<AnyJson> => {
  if (checkIsJsonResponse(response)) {
    return response.json();
  } else {
    // TO-DO: should we handle this more gracefully? Do we ever not get JSON from ther server?
    throw new Error('expected JSON response from server');
  }
};
