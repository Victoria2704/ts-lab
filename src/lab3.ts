import { readFile, writeFile } from "node:fs/promises";

export type CSVRow = Record<string, string>;

export function csvToJSON(input: string[], delimiter: string): CSVRow[] {
  if (input.length === 0) return [];
  const headers = input[0]!.split(delimiter);

  if (headers.length === 0 || headers.some((h) => h.trim() === "")) {
    throw new Error("Invalid CSV header");
  }

  return input.slice(1).map((line) => {
    const values = line.split(delimiter);

    if (values.length !== headers.length) {
      throw new Error("Invalid CSV format");
    }

    const obj: CSVRow = {};
    headers.forEach((header, i) => {
      obj[header] = values[i]!;
    });

    return obj;
  });
}

export async function formatCSVFileToJSONFile(
  input: string,
  output: string,
  delimiter: string
): Promise<void> {
  const content = await readFile(input, "utf-8");

  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const data = csvToJSON(lines, delimiter);

  const json = JSON.stringify(data, null, 2);
  await writeFile(output, json, "utf-8");
}
