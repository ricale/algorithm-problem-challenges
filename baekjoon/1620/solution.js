function solution(n, m, rows) {
  const byName = new Map();
  const byNum = new Map();

  for (let i = 0; i < n; i++) {
    const name = rows[i];
    byName.set(name, i + 1);
    byNum.set(i + 1, name);
  }

  const result = [];
  for (let i = n; i < n + m; i++) {
    const value = rows[i];
    if (isNaN(+value)) {
      result.push(byName.get(value));
    } else {
      result.push(byNum.get(+value));
    }
  }

  console.log(result.join("\n"));
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
