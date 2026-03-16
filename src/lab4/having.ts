import type { Group } from "./group";
import type { Transform } from "./transform";

export type GroupTransform<T extends object, K extends keyof T> = Transform<
  Group<T, K>
>;

export type Having<T extends object> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;
