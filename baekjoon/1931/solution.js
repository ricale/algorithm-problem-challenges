function solution(n, rows) {
  const sorted = rows.sort((a, b) =>
    a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]
  );

  let ended = 0;
  let result = 0;
  for (let item of sorted) {
    if (item[0] >= ended) {
      ended = item[1];
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
