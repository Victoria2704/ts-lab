import type { Transform } from "./transform";

export type Sort<T extends object> = <K extends keyof T>(
  key: K
) => Transform<T>;
