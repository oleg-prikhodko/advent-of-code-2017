import { readFile } from "fs/promises";
import { equal as assertEqual } from "assert";

(async () => {
  const contents = await readFile("./08/input.txt", { encoding: "utf8" });
  const calc = new Calc(contents.trim().split("\n"));
  calc.run();
  console.log(calc.getMaxRegister());
  console.log(calc.highestValue);
})();

class Calc {
  instructions: string[];
  registers: Record<string, number>;
  highestValue: number;

  constructor(instructions: string[]) {
    this.instructions = instructions.slice();
    this.registers = {};
    this.highestValue = 0;
  }

  getRegisterValue(key: string) {
    if (key in this.registers) {
      return this.registers[key];
    } else {
      const initValue = 0;
      this.registers[key] = initValue;
      return initValue;
    }
  }

  resolveCondition(condition: string): boolean {
    const [, reg] = /^(\w+) /.exec(condition)!;
    const val = this.getRegisterValue(reg);
    return eval(condition.replace(reg, val.toString()));
  }

  resolveOperation(operation: string) {
    const [, reg, op, val] = /(\w+) (\w+) (.+)/.exec(operation)!;
    const regVal = this.getRegisterValue(reg);
    const intVal = parseInt(val);
    switch (op) {
      case "inc":
        this.registers[reg] = regVal + intVal;
        return this.registers[reg];
      case "dec":
        this.registers[reg] = regVal - intVal;
        return this.registers[reg];
      default:
        throw new Error("Unknown operation");
    }
  }

  processLine(line: string) {
    const [, operation, condition] = /(.+) if (.+)/.exec(line)!;
    if (this.resolveCondition(condition)) {
      const result = this.resolveOperation(operation);
      if (result > this.highestValue) {
        this.highestValue = result;
      }
    }
  }

  run() {
    for (const line of this.instructions) {
      this.processLine(line);
    }
  }

  getMaxRegister() {
    return Math.max(...Object.values(this.registers));
  }
}

const instr = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
  .trim()
  .split("\n");

const calc = new Calc(instr);
calc.run();
assertEqual(calc.getMaxRegister(), 1);
assertEqual(calc.highestValue, 10);
