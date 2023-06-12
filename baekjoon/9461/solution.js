function solution(n, nums) {
  const result = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9];
  const max = Math.max(...nums);

  for (let i = 11; i <= max; i++) {
    result[i] = result[i - 1] + result[i - 5];
  }

  console.log(nums.map((it) => result[it]).join("\n"));
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
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
