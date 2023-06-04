function solution(n, rows) {
  const result = [];
  for (let i = 0; i < n; i++) {
    const commands = rows[i * 3];
    const length = +rows[i * 3 + 1];
    const nums = length === 0 ? [] : rows[i * 3 + 2].slice(1, -1).split(",");

    let reversed = false;
    let front = 0;
    let rear = length;
    let j = 0;
    for (; j < commands.length; j++) {
      const com = commands[j];

      if (com === "R") {
        reversed = !reversed;
        continue;
      }

      if (com === "D") {
        if (front === rear) {
          break;
        }
        if (reversed) {
          rear -= 1;
        } else {
          front += 1;
        }
      }
    }
    if (j !== commands.length) {
      result.push("error");
    } else {
      const sliced = nums.slice(front, rear);
      if (reversed) {
        sliced.reverse();
      }
      result.push(`[${sliced.join(",")}]`);
    }
  }
  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n * 3 + offset).map((item) => {
    const splitted = item.trim().split(" ");
    return splitted.length === 1 ? splitted[0] : splitted;
  });
  solution(n, rows);

  idx += n * 3 + offset;
}
