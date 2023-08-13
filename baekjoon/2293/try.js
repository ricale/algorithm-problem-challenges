function dp(coins, coinIdx, target) {
  if (coinIdx === coins.length - 1) {
    return target % coins[coinIdx] === 0 ? 1 : 0;
  }

  let result = 0;
  let sum = 0;
  while (sum <= target) {
    result += target - sum === 0 ? 1 : dp(coins, coinIdx + 1, target - sum);
    sum += coins[coinIdx];
  }

  return result;
}

function solution(n, k, rows) {
  rows.sort((a, b) => b - a);
  const result = dp(rows, 0, k);
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
  const [n, k] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, k, rows);

  idx += n + offset;
}
