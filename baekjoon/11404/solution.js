function solution(n, m, rows) {
  const answer = [...new Array(n)].map(() => new Array(n).fill(Infinity));

  for (const [a, b, c] of rows) {
    answer[a - 1][b - 1] = Math.min(answer[a - 1][b - 1], c);
  }

  for (let i = 0; i < n; i++) {
    answer[i][i] = 0;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        answer[i][j] = Math.min(answer[i][j], answer[i][k] + answer[k][j]);
      }
    }
  }

  console.log(
    answer
      .map((row) => row.map((item) => (item === Infinity ? 0 : item)).join(" "))
      .join("\n")
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
  const n = +cases[idx++];
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
