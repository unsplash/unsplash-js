// Copied from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
export type JsonMap = { [key: string]: AnyJson };
export type JsonArray = Array<AnyJson>;

// https://stackoverflow.com/a/9436948
export const checkIsString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
export type OmitStrict<T, K extends keyof T> = Omit<T, K>;

// Note: unlike TypeScript's `NonNullable`, this does _not_ include `undefined`. See discussion at
export type Nullable<T> = T | null;

const isDefined = <T>(x: T | null | undefined): x is T =>
  x !== null && x !== undefined;

/** Takes a dictionary containing nullish values and returns a dictionary of all the defined
 * (non-nullish) values.
 *
 * Inspired by
 * http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Maybe.html#v:catMaybes
 * https://github.com/gcanti/fp-ts/blob/42870714ebcae4ecf132291c687c845b6837b7d2/docs/Record.md#compact
 * Similar to fp-ts `compact`, but uses `Defined` instead of `Option`.
 */
export const compactDefined = <A>(obj: Record<string, A>) =>
  Object.keys(obj).reduce<Record<string, A>>((acc, key) => {
    const value = obj[key];
    return {
      ...acc,
      ...(isDefined(value) ? { key: value } : {}),
    };
  }, {});

export enum OrderBy {
  LATEST = 'latest',
  POPULAR = 'popular',
  OLDEST = 'oldest',
}
export type Orientation = 'landscape' | 'portrait' | 'squarish';
