export enum OrderBy {
  LATEST = 'latest',
  POPULAR = 'popular',
  OLDEST = 'oldest',
}
export type Orientation = 'landscape' | 'portrait' | 'squarish';

export type PaginationParams = {
  perPage?: number;
  page?: number;
};
