export type Group<T extends object, K extends keyof T> = {
  key: T[K];
  items: T[];
};
