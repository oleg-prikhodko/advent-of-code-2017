import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./06/input.txt", { encoding: "utf8" });
  const bankCalculator = new BankCalc(contents, "\t");
  bankCalculator.run();
  const firstCycle = bankCalculator.cycle;
  bankCalculator.run(true);
  const secondCycle = bankCalculator.cycle;
  console.log(secondCycle - firstCycle - 1);
})();

class BankCalc {
  banks: number[];
  configurations: Set<string>;
  cycle: number;
  firstDuplicate?: string;
  constructor(banks: number[] | string, separator = " ") {
    this.banks = Array.isArray(banks)
      ? banks.slice()
      : banks.trim().split(separator).map(Number);
    this.configurations = new Set<string>();
    this.configurations.add(this.banks.toString());
    this.cycle = 0;
  }
  chooseBankIndex() {
    let highestIndex = 0;
    for (const [index, bank] of this.banks.entries()) {
      if (bank > this.banks[highestIndex]) {
        highestIndex = index;
      }
    }
    return highestIndex;
  }
  redistribute(bankIndex: number) {
    let value = this.banks[bankIndex];
    this.banks[bankIndex] = 0;
    let index = bankIndex;
    while (value > 0) {
      index = (index + 1) % this.banks.length;
      this.banks[index]++;
      value--;
    }
  }
  run(part2 = false) {
    while (true) {
      this.redistribute(this.chooseBankIndex());
      this.cycle++;
      const currentConfig = this.banks.toString();
      if (this.configurations.has(currentConfig)) {
        if (part2) {
          if (this.firstDuplicate === undefined) {
            this.firstDuplicate = currentConfig;
          } else if (currentConfig === this.firstDuplicate) {
            break;
          }
        } else {
          break;
        }
      } else {
        this.configurations.add(currentConfig);
      }
    }
  }
}

const bc = new BankCalc("0 2 7 0");
bc.run();
assertEqual(bc.cycle, 5);
bc.run(true);
assertEqual(bc.cycle, 10);
