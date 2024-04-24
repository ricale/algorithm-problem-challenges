function solution(n, m, rows) {
  const ys = new Array(n).fill(false);
  const xs = new Array(m).fill(false);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === "X") {
        ys[i] = true;
        xs[j] = true;
      }
    }
  }

  console.log(
    Math.max(
      ys.filter((item) => !item).length,
      xs.filter((item) => !item).length
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
  const rows = cases.slice(idx, idx + n);
  idx += n;

  solution(n, m, rows);
}
