import {
  createGroupBy,
  createHaving,
  createSort,
  createWhere,
  query,
} from "./lab4.ts";

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

const where = createWhere<User>();
const sort = createSort<User>();
const groupBy = createGroupBy<User>();
const having = createHaving<User>();

const search = query(
  where("name", "John"),
  where("surname", "Doe"),
  sort("age")
);

const groupedSearch = query(
  groupBy("city"),
  having<"city">((group) => group.key === "NY")
);

console.log("Search result:");
console.log(JSON.stringify(search(users), null, 2));
console.log("Grouped result:");
console.log(JSON.stringify(groupedSearch(users), null, 2));
