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
      throw new Error('Expected x-total header to be valid integer.');
    }
  } else {
    throw new Error('Expected x-total header to exist.');
  }
};

type FeedResponse<T> = {
  results: T[];
  total: number;
};

export const handleFeedResponse = <T>(): HandleResponse<FeedResponse<T>> => ({
  response,
  jsonResponse,
}) => ({
  results: castResponse<T[]>()({ jsonResponse, response }),
  total: getTotalFromApiFeedResponse(response),
});
