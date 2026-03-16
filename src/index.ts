import { csvToJSON } from "./lab3.js";

const sampleCsv = [
  "name;age;city",
  "Victoria;21;Novosibirsk",
  "Alex;22;Tomsk",
];

console.log(csvToJSON(sampleCsv, ";"));
