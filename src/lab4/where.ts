import type { Transform } from "./transform";

export type Where<T extends object> = <K extends keyof T>(
  key: K,
  value: T[K]
) => Transform<T>;
