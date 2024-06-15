function solution(n, m, rows, k, problems) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < m; j++) {
      rows[i][j] += rows[i][j - 1];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      rows[i][j] += rows[i - 1][j];
    }
  }

  let result = "";
  for (const [y1, x1, y2, x2] of problems) {
    const sum =
      rows[y2][x2] -
      (x1 > 0 ? rows[y2][x1 - 1] : 0) -
      (y1 > 0 ? rows[y1 - 1][x2] : 0) +
      (x1 > 0 && y1 > 0 ? rows[y1 - 1][x1 - 1] : 0);
    result += `${sum}\n`;
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;
  const k = +cases[idx++];
  const problems = cases.slice(idx, idx + k).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it - 1);
  });
  idx += k;

  solution(n, m, rows, k, problems);
}
