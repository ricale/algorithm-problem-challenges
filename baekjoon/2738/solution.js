function solution(n, rows) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += rows[i].map((it, j) => +it + +rows[i + n][j]).join(" ") + "\n";
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

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const [n, m] = cases[idx].split(" ");
  const offset = 1;
  const rows = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => it.trim().split(" "));
  solution(+n, rows);

  idx += n + offset;
}
