import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./04/input.txt", { encoding: "utf8" });
  const phrases = contents.trim().split("\n");
  const noDuplicates = phrases.filter(hasNoDuplicates);
  console.log(noDuplicates.length);
  const noAnagrams = noDuplicates.filter(hasNoAnagrams);
  console.log(noAnagrams.length);
})();

function hasNoDuplicates(phrase: string) {
  const words = phrase.split(" ");
  const set = new Set<string>();
  for (const word of words) {
    if (set.has(word)) {
      return false;
    }
    set.add(word);
  }
  return true;
}

function hasNoAnagrams(phrase: string) {
  const sortedPhrase = phrase
    .split(" ")
    .map((word) => word.split("").sort().join(""))
    .join(" ");
  return hasNoDuplicates(sortedPhrase);
}

assertEqual(hasNoDuplicates("aa bb cc dd ee"), true);
assertEqual(hasNoDuplicates("aa bb cc dd aa"), false);
assertEqual(hasNoDuplicates("aa bb cc dd aaa"), true);

assertEqual(hasNoAnagrams("abcde fghij"), true);
assertEqual(hasNoAnagrams("abcde xyz ecdab"), false);
assertEqual(hasNoAnagrams("a ab abc abd abf abj"), true);
assertEqual(hasNoAnagrams("iiii oiii ooii oooi oooo"), true);
assertEqual(hasNoAnagrams("oiii ioii iioi iiio"), false);
