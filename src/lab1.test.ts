import { describe, test, expect } from "vitest";
import {
  createUser,
  createBook,
  calculateArea,
  getStatusColor,
  makeFirstBig,
  cleanText,
  getFirstElement,
  findById,
} from "./lab1";

describe("Lab1", () => {
  test("Task1: createUser default isActive=true", () => {
    const u = createUser(1, "Victoria", undefined);
    expect(u.isActive).toBe(true);
  });

  test("Task2: createBook year optional", () => {
    const b = createBook({ title: "HP", author: "Rowling", genre: "fiction" });
    expect(b.year).toBeUndefined();
  });

  test("Task3: calculateArea", () => {
    expect(calculateArea("square", { side: 5 })).toBe(25);
    expect(calculateArea("circle", { radius: 10 })).toBeCloseTo(Math.PI * 100, 6);
  });

  test("Task4: getStatusColor", () => {
    expect(getStatusColor("active")).toBe("green");
    expect(getStatusColor("inactive")).toBe("gray");
    expect(getStatusColor("new")).toBe("blue");
  });

  test("Task5: formatters", () => {
    expect(makeFirstBig("  hello  ")).toBe("Hello");
    expect(cleanText("  hello  ", true)).toBe("HELLO");
  });

  test("Task6: getFirstElement", () => {
    expect(getFirstElement([10, 20])).toBe(10);
    expect(getFirstElement<string>([])).toBeUndefined();
  });

  test("Task7: findById", () => {
    const items = [{ id: 1, name: "V" }, { id: 2, name: "S" }];
    expect(findById(items, 2)?.name).toBe("S");
    expect(findById(items, 999)).toBeUndefined();
  });
});