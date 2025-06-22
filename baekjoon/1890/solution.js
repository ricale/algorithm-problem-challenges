function solution(n, rows) {
  const answers = [...new Array(n)].map(() => [...new Array(n)].fill(0n));
  answers[0][0] = 1n;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const step = rows[i][j];
      if (step === 0) {
        continue;
      }

      if (i + step < n) {
        answers[i + step][j] += answers[i][j];
      }
      if (j + step < n) {
        answers[i][j + step] += answers[i][j];
      }
    }
  }

  console.log(answers[n - 1][[n - 1]].toString());
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
