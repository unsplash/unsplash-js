export enum OrderBy {
  LATEST = 'latest',
  POPULAR = 'popular',
  VIEWS = 'views',
  DOWNLOADS = 'downloads',
  OLDEST = 'oldest',
}
export type Orientation = 'landscape' | 'portrait' | 'squarish';
export type OrientationParam = {
  orientation?: Orientation;
};
export type Plus = 'mixed' | 'only' | 'none';

export type PaginationParams = {
  /**
   * API defaults to `10` if no value is provided
   */
  perPage?: number;
  /**
   * API defaults to `1` if no value is provided
   */
  page?: number;
  /**
   * API defaults to `"latest"` if no value is provided
   */
  orderBy?: OrderBy;
};
