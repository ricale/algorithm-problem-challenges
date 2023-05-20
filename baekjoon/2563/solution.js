function solution(n, rows) {
  const board = [...new Array(100)].map(() => new Array(100).fill(0));
  let count = 0;

  for (let [n1, n2] of rows) {
    const x = +n1 - 1;
    const y = +n2 - 1;
    for (let i = x; i < x + 10; i++) {
      for (let j = y; j < y + 10; j++) {
        if (board[j][i] === 0) {
          board[j][i] = 1;
          count += 1;
        }
      }
    }
  }

  console.log(count);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => it.trim().split(" "));
  solution(n, rows);

  idx += n + offset;
}
