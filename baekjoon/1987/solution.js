function solution(r, c, rows) {
  const checked = new Array(26);
  let max = 1;

  const travel = (y, x, count = 1) => {
    max = Math.max(count, max);
    const cands = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (const [ny, nx] of cands) {
      if (ny >= 0 && ny < r && nx >= 0 && nx < c) {
        const nextCode = rows[ny][nx].charCodeAt() - 65;
        if (!checked[nextCode]) {
          checked[nextCode] = true;
          travel(ny, nx, count + 1);
          checked[nextCode] = false;
        }
      }
    }
  };

  checked[rows[0][0].charCodeAt() - 65] = true;
  travel(0, 0);
  console.log(max);
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
  const [r, c] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + r);
  idx += r;

  solution(r, c, rows);
}
