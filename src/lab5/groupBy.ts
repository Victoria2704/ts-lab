import type { Group } from "./group.ts";
import type { Transform } from "./transform.ts";

export type GroupBy<T extends object> = <K extends keyof T>(
  key: K
) => Transform<T, Group<T, K>>;

export function createGroupBy<T extends object>(): GroupBy<T> {
  return (key) => (items: T[]) => {
    const groups = new Map<T[typeof key], Group<T, typeof key>>();

    for (const item of items) {
      const groupKey = item[key];
      const group = groups.get(groupKey);

      if (group) {
        group.items.push(item);
      } else {
        groups.set(groupKey, {
          key: groupKey,
          items: [item],
        });
      }
    }

    return Array.from(groups.values());
  };
}
