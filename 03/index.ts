import { equal as assertEqual } from "assert";

type Coords = [x: number, y: number];

function getCoordinates(num: number): Coords {
  for (const [res, x, y] of getNum()) {
    if (res === num) {
      return [x, y];
    }
  }
  throw new Error("Something went wrong");
}

function calcDistance(target: Coords, start = [0, 0] as Coords) {
  return Math.abs(target[0] - start[0]) + Math.abs(target[1] - start[1]);
}

function getSize(turn: number): number {
  if (turn === 1) {
    return 1;
  } else {
    return getSize(turn - 1) + 2;
  }
}

type Results = Record<string, number>;

function* getNum(
  incrementResult = (result: number, x: number, y: number, results: Results) =>
    result + 1
) {
  const results: Results = { "0,0": 1 };
  yield [1, 0, 0];

  let x = 1;
  let y = 0;
  let turn = 2;
  let result = incrementResult(1, x, y, results);
  results[[x, y].toString()] = result;

  while (true) {
    const size = getSize(turn);
    for (let i = 0; i < size - 2; i++) {
      y++;
      result = incrementResult(result, x, y, results);
      results[[x, y].toString()] = result;
      yield [result, x, y];
    }
    for (let i = 0; i < size - 1; i++) {
      x--;
      result = incrementResult(result, x, y, results);
      results[[x, y].toString()] = result;
      yield [result, x, y];
    }
    for (let i = 0; i < size - 1; i++) {
      y--;
      result = incrementResult(result, x, y, results);
      results[[x, y].toString()] = result;
      yield [result, x, y];
    }
    for (let i = 0; i < size; i++) {
      x++;
      result = incrementResult(result, x, y, results);
      results[[x, y].toString()] = result;
      yield [result, x, y];
    }
    turn++;
  }
}

assertEqual(calcDistance(getCoordinates(1)), 0);
assertEqual(calcDistance(getCoordinates(12)), 3);
assertEqual(calcDistance(getCoordinates(23)), 2);
assertEqual(calcDistance(getCoordinates(1024)), 31);

const INPUT = 312051;

console.log(calcDistance(getCoordinates(INPUT)));

function incrementResult(
  result: number,
  x: number,
  y: number,
  results: Results
) {
  return [
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
  ]
    .map((tuple) => tuple.toString())
    .reduce((acc, key) => {
      return key in results ? acc + results[key] : acc;
    }, 0);
}

(function () {
  for (const [res] of getNum(incrementResult)) {
    if (res > INPUT) {
      console.log(res);
      break;
    }
  }
})();
