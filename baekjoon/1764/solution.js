function solution(n, m, rows) {
  const checked = new Set();

  for (let i = 0; i < n; i++) {
    checked.add(rows[i]);
  }

  const result = [];
  for (let i = n; i < n + m; i++) {
    if (checked.has(rows[i])) {
      result.push(rows[i]);
    }
  }

  console.log(`${result.length}\n${result.sort().join("\n")}`);
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + m + offset).map((it) => {
    return it;
  });
  solution(n, m, rows);

  idx += n + m + offset;
}
