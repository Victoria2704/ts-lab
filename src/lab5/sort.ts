import type { Transform } from "./transform.js";

export type Sort<T extends object> = <K extends keyof T>(
  key: K
) => Transform<T>;

export function createSort<T extends object>(): Sort<T> {
  return (key) => (items: T[]) =>
    [...items].sort((left: T, right: T) => {
      if (left[key] < right[key]) return -1;
      if (left[key] > right[key]) return 1;
      return 0;
    });
}
