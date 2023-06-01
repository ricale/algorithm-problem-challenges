function solution(n, rows) {
  const result = rows
    .sort((a, b) =>
      a.length === b.length ? a.localeCompare(b) : a.length - b.length
    )
    .reduce((acc, it) => {
      if (it !== acc[acc.length - 1]) {
        acc.push(it);
      }
      return acc;
    }, [])
    .join("\n");
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it;
  });
  solution(n, rows);

  idx += n + offset;
}
