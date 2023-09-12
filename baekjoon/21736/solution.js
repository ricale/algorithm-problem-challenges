function getStartPos(n, m, rows) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === "I") {
        return [i, j];
      }
    }
  }
}

function solution(n, m, rows) {
  const start = getStartPos(n, m, rows);

  const queue = [start];
  let qidx = 0;
  let result = 0;

  while (queue.length > qidx) {
    const [y, x] = queue[qidx++];

    const cands = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (const [y2, x2] of cands) {
      const item = rows[y2]?.[x2];
      if (item === "P" || item === "O") {
        rows[y2][x2] = "V";
        queue.push([y2, x2]);
        if (item === "P") {
          result += 1;
        }
      }
    }
  }

  console.log(result === 0 ? "TT" : result);
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
    return item.trim().split("");
  });
  idx += n;

  solution(n, m, rows);
}
