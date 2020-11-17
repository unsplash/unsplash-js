export enum OrderBy {
  LATEST = 'latest',
  POPULAR = 'popular',
  OLDEST = 'oldest',
}
type Orientation = 'landscape' | 'portrait' | 'squarish';
export type OrientationParam = {
  orientation?: Orientation;
};

export type PaginationParams = {
  perPage?: number;
  page?: number;
  orderBy?: OrderBy;
};
