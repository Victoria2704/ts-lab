import { describe, expectTypeOf, test } from "vitest";

import {
  type DeepReadonly,
  type EventHandlers,
  type PickedByType
} from "./lab6.ts";

type User = {
  id: number;
  name: string;
  active: boolean;
  profile: {
    city: string;
    stats: {
      score: number;
    };
  };
  updateName: (value: string) => void;
};

describe("Lab6 type checks", () => {
  test("DeepReadonly makes nested fields readonly", () => {
    type ReadonlyUser = DeepReadonly<User>;

    expectTypeOf<ReadonlyUser>().toEqualTypeOf<{
      readonly id: number;
      readonly name: string;
      readonly active: boolean;
      readonly profile: {
        readonly city: string;
        readonly stats: {
          readonly score: number;
        };
      };
      readonly updateName: (value: string) => void;
    }>();
  });

  test("PickedByType keeps only matching fields", () => {
    type OnlyNumbers = PickedByType<User, number>;
    type OnlyFunctions = PickedByType<User, (...args: never[]) => unknown>;

    expectTypeOf<OnlyNumbers>().toEqualTypeOf<{
      id: number;
    }>();

    expectTypeOf<OnlyFunctions>().toEqualTypeOf<{
      updateName: (value: string) => void;
    }>();
  });

  test("EventHandlers builds handler names from keys", () => {
    type UserHandlers = EventHandlers<{
      click: MouseEvent;
      change: string;
      submit: { id: number };
    }>;

    expectTypeOf<UserHandlers>().toEqualTypeOf<{
      onClick: (value: MouseEvent) => void;
      onChange: (value: string) => void;
      onSubmit: (value: { id: number }) => void;
    }>();
  });
});
