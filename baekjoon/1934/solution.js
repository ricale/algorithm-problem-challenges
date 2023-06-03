function solution(n, rows) {
  const result = [];
  for (let [a, b] of rows) {
    let [min, max] = a < b ? [a, b] : [b, a];
    if (max % min === 0) {
      result.push(max);
      continue;
    }

    let n = 1;
    let divisor = 2;

    while (divisor <= min) {
      if (max % divisor === 0 && min % divisor === 0) {
        max /= divisor;
        min /= divisor;
        n *= divisor;
      } else {
        divisor += 1;
      }
    }

    result.push(min * max * n);
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

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
