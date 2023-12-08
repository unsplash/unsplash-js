/* eslint-disable no-redeclare */

import { isDefined } from './typescript';

/** Takes a dictionary containing nullish values and returns a dictionary of all the defined
 * (non-nullish) values.
 */
export const compactDefined = <A>(obj: Record<string, A | null | undefined>) =>
  Object.keys(obj).reduce<Record<string, A>>((acc, key) => {
    const value = obj[key];
    return {
      ...acc,
      ...(isDefined(value) ? { [key]: value } : {}),
    };
  }, {});

/**
 * copied from `fp-ts`
 * https://github.com/gcanti/fp-ts/blob/70190b5a03ddc2d31b4708c75c6dfad81d0bfa21/perf/function/flow.t¡s
 */
export function flow<A extends Array<unknown>, B>(ab: (...a: A) => B): (...a: A) => B;
export function flow<A extends Array<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
): (...a: A) => C;
export function flow<A extends Array<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (b: C) => D,
): (...a: A) => D;
export function flow(...fns: Array<Function>): Function {
  const len = fns.length - 1;
  return function(this: any, ...x: Array<any>) {
    let y = fns[0].apply(this, x);
    for (let i = 1; i <= len; i++) {
      y = fns[i].call(this, y);
    }
    return y;
  };
}
