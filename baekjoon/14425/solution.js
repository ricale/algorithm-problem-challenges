function solution(n, m, rows) {
  const checked = new Set();
  for (let i = 0; i < n; i++) {
    checked.add(rows[i]);
  }

  let result = 0;
  for (let i = n; i < n + m; i++) {
    if (checked.has(rows[i])) {
      result += 1;
    }
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + m + offset).map((it) => {
    const splitted = it.trim().split(" ");
    return splitted.length === 1 ? splitted[0] : splitted;
  });
  solution(n, m, rows);

  idx += n + m + offset;
}
