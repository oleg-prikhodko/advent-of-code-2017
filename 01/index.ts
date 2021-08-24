import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./01/input.txt", { encoding: "utf8" });
  console.log(calcSum(contents));
  console.log(calcSum(contents, contents.length / 2));
})();

function calcSum(nums: string, offset = 1) {
  return Array.from(nums).reduce((sum, item, index) => {
    const nextItem = nums[(index + offset) % nums.length];
    return item === nextItem ? parseInt(item) + sum : sum;
  }, 0);
}

assertEqual(calcSum("1122"), 3);
assertEqual(calcSum("1111"), 4);
assertEqual(calcSum("1234"), 0);
assertEqual(calcSum("91212129"), 9);

assertEqual(calcSum("1212", 2), 6);
assertEqual(calcSum("1221", 2), 0);
assertEqual(calcSum("123425", 3), 4);
assertEqual(calcSum("123123", 3), 12);
assertEqual(calcSum("12131415", 4), 4);
