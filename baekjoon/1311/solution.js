function solution(n, rows) {
  const result = [...new Array(n)].map(() => []);
  const getAnswer = (current, state) => {
    if (state === (1 << n) - 1) {
      return 0;
    }
    if (result[current][state]) {
      return result[current][state];
    }
    let min = Infinity;
    for (let i = 0; i < n; i++) {
      const bit = 1 << i;
      if ((state & bit) !== 0) {
        continue;
      }
      min = Math.min(
        min,
        getAnswer(current + 1, state | bit) + rows[current][i]
      );
    }
    result[current][state] = min;
    return result[current][state];
  };
  console.log(getAnswer(0, 0));
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
