import { DecodingError } from './errors';
import { HandleResponse, castResponse } from './response';
import { isDefined } from './typescript';

const TOTAL_RESPONSE_HEADER = 'x-total';
const getTotalFromApiFeedResponse = (response: Response) => {
  const totalsStr = response.headers.get(TOTAL_RESPONSE_HEADER);
  if (isDefined(totalsStr)) {
    const total = parseInt(totalsStr);
    if (Number.isInteger(total)) {
      return total;
    } else {
      throw new DecodingError(`expected ${TOTAL_RESPONSE_HEADER} header to be valid integer.`);
    }
  } else {
    throw new DecodingError(`expected ${TOTAL_RESPONSE_HEADER} header to exist.`);
  }
};

type FeedResponse<T> = {
  results: T[];
  total: number;
};

export const handleFeedResponse = <T>(): HandleResponse<FeedResponse<T>> => ({ response }) =>
  castResponse<T[]>()({ response }).then(results => ({
    results,
    total: getTotalFromApiFeedResponse(response),
  }));
