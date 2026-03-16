declare module "vitest" {
  type IsEqual<Actual, Expected> =
    (<T>() => T extends Actual ? 1 : 2) extends
    (<T>() => T extends Expected ? 1 : 2)
      ? (<T>() => T extends Expected ? 1 : 2) extends
        (<T>() => T extends Actual ? 1 : 2)
          ? true
          : false
      : false;

  interface Matcher {
    toBe(value: unknown): void;
    toEqual(value: unknown): void;
    toHaveLength(length: number): void;
  }

  interface TypeMatcher<Actual> {
    toEqualTypeOf<Expected>(
      ...args: IsEqual<Actual, Expected> extends true ? [] : [expected: never]
    ): void;
  }

  export function describe(
    name: string,
    callback: () => void | Promise<void>
  ): void;

  export function test(
    name: string,
    callback: () => void | Promise<void>
  ): void;

  export function expect(value: unknown): Matcher;

  export function expectTypeOf<Actual>(value?: Actual): TypeMatcher<Actual>;
}
