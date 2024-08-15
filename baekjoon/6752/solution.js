function solution(t, c, nums) {
  nums.sort((a, b) => a - b);

  let result = 0;
  let sum = 0;
  for (const num of nums) {
    sum += num;
    if (sum <= t) {
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
  const t = +cases[idx++];
  const c = +cases[idx++];
  const rows = cases.slice(idx, idx + c).map((item) => {
    return +item;
  });
  idx += c;

  solution(t, c, rows);
}
