import type { Group } from "./group";
import type { Transform } from "./transform";

export type GroupTransform<T extends object, K extends keyof T> = Transform<
  Group<T, K>
>;
