import type { Group } from "./group";
import type { Transform } from "./transform";

export type GroupBy<T extends object> = <K extends keyof T>(
  key: K
) => Transform<T, Group<T, K>>;
