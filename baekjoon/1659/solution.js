function solution(n, m, [nums, ...rows]) {
  const subSums = [0];
  for (let i = 1; i <= n; i++) {
    subSums[i] = subSums[i - 1] + nums[i - 1];
  }

  let result = "";
  for (let [i, j] of rows) {
    result += `${subSums[j] - subSums[i - 1]}\n`;
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
  const rows = cases.slice(idx + offset, idx + m + 1 + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += m + 1 + offset;
}
