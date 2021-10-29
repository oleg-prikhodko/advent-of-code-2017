import { equal } from "assert";

function round(
  sequence: number[],
  list: number[],
  initialPos = 0,
  initialSkip = 0
): [number[], number, number] {
  let currentPos = initialPos;
  let skipSize = initialSkip;

  const wrap = (num: number) =>
    num < 0 ? list.length + num : num % list.length;

  for (const length of sequence) {
    //  reverse
    let index = currentPos;
    let finalIndex = wrap(currentPos + length - 1);
    const midIndex = wrap(index + Math.floor(length / 2));

    while (index !== midIndex) {
      let temp = list[index];
      list[index] = list[finalIndex];
      list[finalIndex] = temp;
      index = wrap(index + 1);
      finalIndex = wrap(finalIndex - 1);
    }
    // --------
    currentPos = wrap(currentPos + length + skipSize);
    skipSize++;
  }

  // console.log(list[0] * list[1]);
  return [list, currentPos, skipSize];
}

function codesFromString(str: string) {
  return str
    .split("")
    .reduce<number[]>((acc, el) => {
      acc.push(el.codePointAt(0)!);
      return acc;
    }, [])
    .concat([17, 31, 73, 47, 23]);
}

function run(str: string) {
  const sequence = codesFromString(str);
  let list = Array.from(Array(256), (_, index) => index);
  let pos = 0;
  let skip = 0;
  for (let i = 0; i < 64; i++) {
    [list, pos, skip] = round(sequence, list, pos, skip);
  }

  const denseHash: number[] = [];
  for (let i = 0; i < list.length; i++) {
    const denseHashIndex = Math.floor(i / 16);
    const num = list[i];

    if (i % 16 === 0) {
      denseHash[denseHashIndex] = num;
    } else {
      denseHash[denseHashIndex] = denseHash[denseHashIndex] ^ num;
    }
  }
  return denseHash.map((num) => num.toString(16).padStart(2, "0")).join("");
}

equal(run(""), "a2582a3a0e66e6e86e3812dcb672a272");
equal(run("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");
equal(run("1,2,3"), "3efbe78a8d82f29979031a4aa0b16a9d");
equal(run("1,2,4"), "63960835bcdc130f0b66d7ff4f6a5a8e");

console.log(run("76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229"));
