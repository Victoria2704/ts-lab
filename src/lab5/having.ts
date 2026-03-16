import type { Group } from "./group.js";
import type { Transform } from "./transform.js";

export type GroupTransform<T extends object, K extends keyof T> = Transform<
  Group<T, K>
>;

export type Having<T extends object> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;

export function createHaving<T extends object>(): Having<T> {
  return <K extends keyof T>(predicate: (group: Group<T, K>) => boolean) =>
    (groups: Group<T, K>[]) => groups.filter(predicate);
}
