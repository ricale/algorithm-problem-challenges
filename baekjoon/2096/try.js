function getResult(n, rows, dir) {
  const result = new Array(3).fill(0);
  const last = [...rows[0]];

  const compareFunc = dir === 1 ? Math.max : Math.min;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      result[j] =
        rows[i][j] +
        compareFunc(
          j > 0 ? last[j - 1] : Infinity * dir * -1,
          last[j],
          j < 2 ? last[j + 1] : Infinity * dir * -1
        );
    }
    for (let j = 0; j < 3; j++) {
      last[j] = result[j];
    }
  }

  return compareFunc(...result);
}

function solution(n, rows) {
  const max = getResult(n, rows, 1);
  const min = getResult(n, rows, -1);

  console.log(`${max} ${min}`);
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
