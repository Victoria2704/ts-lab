import { describe, expect, expectTypeOf, test } from "vitest";

import {
  createGroupBy,
  createHaving,
  createSort,
  createWhere,
  query,
  type Group,
  type GroupTransform,
  type Transform,
} from "./lab5.ts";

type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
};

const users: User[] = [
  { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
  { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
  { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
  { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

const groupedByCity: Group<User, "city">[] = [
  {
    key: "NY",
    items: [
      { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
      { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
    ],
  },
  {
    key: "LA",
    items: [
      { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
      { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
    ],
  },
];

const where = createWhere<User>();
const sort = createSort<User>();
const groupBy = createGroupBy<User>();
const having = createHaving<User>();

describe("Lab5 runtime checks", () => {
  test("where filters items by field value", () => {
    expect(where("city", "NY")(users)).toEqual([
      { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
      { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
    ]);
  });

  test("sort returns items in ascending order without mutating input", () => {
    const result = sort("age")(users);

    expect(result.map((user) => user.id)).toEqual([2, 1, 3, 4]);
    expect(users.map((user) => user.id)).toEqual([1, 2, 3, 4]);
  });

  test("groupBy creates groups for selected key", () => {
    expect(groupBy("city")(users)).toEqual(groupedByCity);
  });

  test("having filters groups by predicate", () => {
    const onlyNyGroups = having<"city">((group) => group.key === "NY");

    expect(onlyNyGroups(groupBy("city")(users))).toEqual([groupedByCity[0]]);
  });

  test("query composes multiple transforms", () => {
    const search = query(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );

    expect(search(users)).toEqual([
      { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
      { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
      { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    ]);
  });
});

describe("Lab5 type checks", () => {
  test("where returns a regular transform", () => {
    expectTypeOf(where("city", "NY")).toEqualTypeOf<Transform<User>>();
  });

  test("sort returns a regular transform", () => {
    expectTypeOf(sort("age")).toEqualTypeOf<Transform<User>>();
  });

  test("groupBy returns grouped output", () => {
    expectTypeOf(groupBy("city")).toEqualTypeOf<Transform<User, Group<User, "city">>>();
  });

  test("having works with grouped transforms", () => {
    const onlyNyGroups = having<"city">((group) => group.key === "NY");

    expectTypeOf(onlyNyGroups).toEqualTypeOf<GroupTransform<User, "city">>();
  });

  test("query keeps the plain array result type", () => {
    const search = query(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );

    expectTypeOf(search).toEqualTypeOf<Transform<User>>();
    expectTypeOf(search(users)).toEqualTypeOf<User[]>();
  });

  test("query infers grouped output type", () => {
    const groupedSearch = query(
      groupBy("city"),
      having<"city">((group) => group.key === "NY")
    );

    expectTypeOf(groupedSearch).toEqualTypeOf<
      Transform<User, Group<User, "city">>
    >();
    expectTypeOf(groupedSearch(users)).toEqualTypeOf<Group<User, "city">[]>();
  });

  test("query without steps preserves the input type", () => {
    const passthrough = query<User>();

    expectTypeOf(passthrough).toEqualTypeOf<Transform<User>>();
    expectTypeOf(passthrough(users)).toEqualTypeOf<User[]>();
  });
});
