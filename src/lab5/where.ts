import type { Transform } from "./transform.ts";

export type Where<T extends object> = <K extends keyof T>(
  key: K,
  value: T[K]
) => Transform<T>;

export function createWhere<T extends object>(): Where<T> {
  return (key, value) => (items: T[]) =>
    items.filter((item: T) => item[key] === value);
}
