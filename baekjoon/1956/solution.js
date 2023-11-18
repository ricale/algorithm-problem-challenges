function solution(v, e, rows) {
  const result = [...new Array(v)].map(() => new Array(v).fill(Infinity));

  for (const [a, b, c] of rows) {
    result[a - 1][b - 1] = Math.min(result[a - 1][b - 1], c);
  }

  for (let k = 0; k < v; k++) {
    for (let i = 0; i < v; i++) {
      for (let j = 0; j < v; j++) {
        result[i][j] = Math.min(result[i][j], result[i][k] + result[k][j]);
      }
    }
  }

  let min = Infinity;
  for (let i = 0; i < v; i++) {
    min = Math.min(min, result[i][i]);
  }

  console.log(min === Infinity ? "-1" : min);
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
  const [v, e] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + e).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += e;

  solution(v, e, rows);
}
