const MAX = 1000 * 1000;

function solution(n, rows) {
  const answers = [...new Array(n)].map(() => new Array(3).fill(0));

  let result = MAX;
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 3; i++) {
      if (c === i) {
        answers[0][i] = rows[0][i];
      } else {
        answers[0][i] = MAX;
      }
    }

    for (let i = 1; i < n; i++) {
      answers[i][0] =
        rows[i][0] + Math.min(answers[i - 1][1], answers[i - 1][2]);
      answers[i][1] =
        rows[i][1] + Math.min(answers[i - 1][0], answers[i - 1][2]);
      answers[i][2] =
        rows[i][2] + Math.min(answers[i - 1][0], answers[i - 1][1]);
    }

    for (let i = 0; i < 3; i++) {
      if (c !== i) {
        result = Math.min(result, answers[n - 1][i]);
      }
    }
  }

  console.log(result);
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
