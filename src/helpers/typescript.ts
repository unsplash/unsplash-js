// Copied from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
export type JsonMap = { [key: string]: AnyJson };
export type JsonArray = Array<AnyJson>;

export const checkIsString = getRefinement(
  (value: unknown): Nullable<string> => (typeof value === 'string' ? value : null),
);

/**
 * https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
 */
export type OmitStrict<T, K extends keyof T> = Omit<T, K>;

/**
 * Unlike TypeScript's `NonNullable`, this does _not_ include `undefined`
 */
export type Nullable<T> = T | null;

export const isDefined = <T>(x: T | null | undefined): x is T => x !== null && x !== undefined;

export type NonEmptyArray<T> = [T, ...T[]];

type Refinement<A, B extends A> = (a: A) => a is B;
export function getRefinement<A, B extends A>(getB: (a: A) => Nullable<B>): Refinement<A, B> {
  return (a: A): a is B => isDefined(getB(a));
}

export const checkIsNonEmptyArray = <T>(a: T[]): a is NonEmptyArray<T> => a.length > 0;
