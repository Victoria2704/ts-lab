import type { Transform } from "./transform";

type AnyTransform = Transform<any, any>;

type TransformInput<TStep extends AnyTransform> = TStep extends Transform<
  infer TInput,
  any
>
  ? TInput
  : never;

type TransformOutput<TStep extends AnyTransform> = TStep extends Transform<
  any,
  infer TOutput
>
  ? TOutput
  : never;

type QueryInput<Steps extends readonly [AnyTransform, ...AnyTransform[]]> =
  TransformInput<Steps[0]>;

type QueryOutput<Steps extends readonly [AnyTransform, ...AnyTransform[]]> =
  Steps extends readonly [...AnyTransform[], infer Last extends AnyTransform]
    ? TransformOutput<Last>
    : never;

export function query<Input>(): Transform<Input>;
export function query<
  const Steps extends readonly [AnyTransform, ...AnyTransform[]],
>(
  ...steps: Steps
): Transform<QueryInput<Steps>, QueryOutput<Steps>>;
export function query(
  ...steps: readonly AnyTransform[]
): Transform<unknown, unknown> {
  return (items) => {
    let result: unknown[] = items;

    for (const step of steps) {
      result = step(result as any[]);
    }

    return result;
  };
}
