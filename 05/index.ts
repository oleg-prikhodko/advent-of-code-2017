import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./05/input.txt", { encoding: "utf8" });
  console.log(run(parseList(contents)));
  console.log(run(parseList(contents), updateOffset));
})();

function parseList(contents: string) {
  return contents.trim().split("\n").map(Number);
}

function run(jumps: number[], updateOffset = (offset: number) => offset + 1) {
  const _jumps = jumps.slice();
  let index = 0;
  let steps = 0;
  while (index >= 0 && index < jumps.length) {
    const offset = _jumps[index];
    _jumps[index] = updateOffset(offset);
    index += offset;
    steps++;
  }
  return steps;
}

function updateOffset(offset: number) {
  return offset >= 3 ? offset - 1 : offset + 1;
}

const fixtureList = `
0
3
0
1
-3`;
assertEqual(run(parseList(fixtureList)), 5);
assertEqual(run(parseList(fixtureList), updateOffset), 10);
