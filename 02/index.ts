import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./02/input.txt", { encoding: "utf8" });
  const nums = parseNums(contents);
  console.log(calcChecksum(nums));
  console.log(calcDivisionResult(nums));
})();

function parseNums(contents: string, separator = "\t") {
  return contents
    .trim()
    .split("\n")
    .map((line) => line.split(separator).map(Number));
}

function calcChecksum(nums: number[][]) {
  return nums.reduce((sum, row) => {
    const min = Math.min(...row);
    const max = Math.max(...row);
    const diff = max - min;
    return sum + diff;
  }, 0);
}

function calcDivisionResult(nums: number[][]) {
  return nums.reduce((sum, row) => {
    return sum + findResult(row);
  }, 0);
}

function findResult(nums: number[]) {
  for (const num of nums) {
    const rest = new Set(nums);
    rest.delete(num);
    for (const divider of rest.values()) {
      const result = num / divider;
      if (Number.isInteger(result)) {
        return result;
      }
    }
  }
  throw new Error("No pair");
}

const fixture_1 = `
5 1 9 5
7 5 3
2 4 6 8`;
assertEqual(calcChecksum(parseNums(fixture_1, " ")), 18);

const fixture_2 = `
5 9 2 8
9 4 7 3
3 8 6 5`;
assertEqual(calcDivisionResult(parseNums(fixture_2, " ")), 9);
