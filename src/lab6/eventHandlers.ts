export type EventHandlers<T> = {
  [K in keyof T as K extends string
    ? `on${Capitalize<K>}`
    : never]: (value: T[K]) => void;
};
