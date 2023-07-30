function solution(n, rows) {
  const answers = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

  for (let l = 1; l < n; l++) {
    for (let start = 1; start <= n - l; start++) {
      const end = start + l;
      answers[start][end] = Infinity;
      for (let mid = start; mid < end; mid++) {
        answers[start][end] = Math.min(
          answers[start][end],
          answers[start][mid] +
            answers[mid + 1][end] +
            rows[start - 1][0] * rows[mid - 1][1] * rows[end - 1][1]
        );
      }
    }
  }

  console.log(answers[1][n]);
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
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
