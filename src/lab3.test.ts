import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

import { readFile, writeFile } from "node:fs/promises";
import { csvToJSON, formatCSVFileToJSONFile } from "./lab3.js";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Lab3: csvToJSON", () => {
  test("converts CSV lines to array of objects", () => {
    const res = csvToJSON(["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"], ";");

    expect(res).toEqual([
      { p1: "1", p2: "A", p3: "b", p4: "c" },
      { p1: "2", p2: "B", p3: "v", p4: "d" },
    ]);
  });

  test("throws Error when row has wrong number of values", () => {
    expect(() => csvToJSON(["a;b", "1"], ";")).toThrow();
    expect(() => csvToJSON(["a;b", "1;2;3"], ";")).toThrow();
  });
});

describe("formatCSVFileToJSONFile", () => {
  test("reads CSV and writes JSON file", async () => {
    const csvData = `p1;p2;p3;p4
1;A;b;c
2;B;v;d`;

    vi.mocked(readFile).mockResolvedValue(csvData as any);
    vi.mocked(writeFile).mockResolvedValue(undefined as any);

    await formatCSVFileToJSONFile("input.csv", "output.json", ";");

    expect(readFile).toHaveBeenCalledWith("input.csv", "utf-8");

    expect(writeFile).toHaveBeenCalledWith(
      "output.json",
      JSON.stringify(
        [
          { p1: "1", p2: "A", p3: "b", p4: "c" },
          { p1: "2", p2: "B", p3: "v", p4: "d" },
        ],
        null,
        2
      ),
      "utf-8"
    );
  });
});