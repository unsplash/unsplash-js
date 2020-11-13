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

export const isDefined = <T>(x: T | null | undefined): x is T =>
  x !== null && x !== undefined;
