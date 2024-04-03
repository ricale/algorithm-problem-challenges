function solution(n, rows) {
  const answers = [...new Array(n)].map(() => []);

  const getAnswer = (current, state) => {
    if (state === (1 << n) - 1) {
      return rows[current][0] !== 0 ? rows[current][0] : Infinity;
    }
    if (answers[current][state]) {
      return answers[current][state];
    }
    let min = Infinity;
    for (let i = 0; i < n; i++) {
      const bit = 1 << i;
      if ((state & bit) !== 0) {
        continue;
      }
      if (rows[current][i] === 0) {
        continue;
      }
      min = Math.min(min, getAnswer(i, state | bit) + rows[current][i]);
    }

    answers[current][state] = min;

    return answers[current][state];
  };

  console.log(getAnswer(0, 1));
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
