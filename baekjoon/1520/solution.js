function dp(rows, answers, x, y) {
  if (answers[y][x] !== -1) {
    return answers[y][x];
  }

  answers[y][x] = 0;
  const current = rows[y][x];
  const cands = [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ];
  for (let [y2, x2] of cands) {
    if (rows[y2]?.[x2] !== undefined && current > rows[y2][x2]) {
      answers[y][x] += dp(rows, answers, x2, y2);
    }
  }

  return answers[y][x];
}

function solution(n, m, rows) {
  const answers = [...new Array(n)].map(() => new Array(m).fill(-1));
  answers[n - 1][m - 1] = 1;
  dp(rows, answers, 0, 0);
  console.log(answers[0][0]);
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + offset;
}
