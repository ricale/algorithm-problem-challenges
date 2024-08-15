function solution(n, m, rows) {
  const answers = [...new Array(n + 1)].map(() => new Array(n + 1).fill(null));

  for (const [a, b] of rows) {
    answers[a][b] = 1;
    answers[b][a] = -1;
  }

  for (let mid = 1; mid <= n; mid++) {
    for (let start = 1; start <= n; start++) {
      for (let end = 1; end <= n; end++) {
        if (answers[start][end] !== null) {
          continue;
        }
        const startSide = answers[start][mid];
        const endSide = answers[mid][end];
        if (startSide === null || endSide === null) {
          continue;
        }
        if (startSide * endSide < 0) {
          continue;
        }
        answers[start][end] = answers[start][mid] + answers[mid][end];
      }
    }
  }

  console.log(
    answers
      .slice(1)
      .reduce(
        (acc, row) =>
          acc + (row.filter((item) => item === null).length === 2 ? 1 : 0),
        0
      )
  );
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
