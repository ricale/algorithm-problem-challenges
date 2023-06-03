function solution(n, [_, ...rows]) {
  const checked = new Set();
  let count = 0;
  for (let row of rows) {
    if (row === "ENTER") {
      count += checked.size;
      checked.clear();
      continue;
    }

    checked.add(row);
  }

  console.log(checked.size + count);
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
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it;
  });
  solution(n, rows);

  idx += n + offset;
}
