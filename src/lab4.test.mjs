import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  createGroupBy,
  createHaving,
  createSort,
  createWhere,
  query,
} from "./lab4.ts";

const users = [
  { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
  { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
  { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
  { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

const groupedByCity = [
  {
    key: "NY",
    items: [users[0], users[1]],
  },
  {
    key: "LA",
    items: [users[2], users[3]],
  },
];

const where = createWhere();
const sort = createSort();
const groupBy = createGroupBy();
const having = createHaving();

describe("Lab4 helpers", () => {
  test("where filters items by field value", () => {
    assert.deepStrictEqual(where("city", "NY")(users), [users[0], users[1]]);
  });

  test("sort returns items in ascending order without mutating input", () => {
    const result = sort("age")(users);

    assert.deepStrictEqual(
      result.map((user) => user.id),
      [2, 1, 3, 4]
    );
    assert.deepStrictEqual(
      users.map((user) => user.id),
      [1, 2, 3, 4]
    );
  });

  test("groupBy creates groups for selected key", () => {
    assert.deepStrictEqual(groupBy("city")(users), groupedByCity);
  });

  test("having filters groups by predicate", () => {
    const onlyNyGroups = having((group) => group.key === "NY");

    assert.deepStrictEqual(onlyNyGroups(groupBy("city")(users)), [groupedByCity[0]]);
  });

  test("query composes multiple steps", () => {
    const search = query(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );

    assert.deepStrictEqual(search(users), [users[1], users[0], users[2]]);
  });

  test("query works with grouping helpers", () => {
    const groupedSearch = query(
      groupBy("city"),
      having((group) => group.key === "NY")
    );

    assert.deepStrictEqual(groupedSearch(users), [groupedByCity[0]]);
  });

  test("query without steps returns the same array", () => {
    const passthrough = query();

    assert.strictEqual(passthrough(users), users);
  });
});
