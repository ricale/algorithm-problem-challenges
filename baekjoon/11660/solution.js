function solution(n, m, rows) {
  const nums = rows.slice(0, n);
  const queries = rows.slice(n);
  const sums = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      sums[i][j] =
        sums[i - 1][j] +
        sums[i][j - 1] -
        sums[i - 1][j - 1] +
        nums[i - 1][j - 1];
    }
  }

  let result = "";
  for (let [x1, y1, x2, y2] of queries) {
    const bigSum = sums[x2][y2];
    const aboveSum = sums[x2][y1 - 1];
    const leftSum = sums[x1 - 1][y2];
    const smallSum = sums[x1 - 1][y1 - 1];

    result += `${bigSum - aboveSum - leftSum + smallSum}\n`;
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + m + offset;
}
