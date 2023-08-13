function solution(n, k, coins) {
  let prev = [...new Array(k + 1)].map((_, i) => (i === 0 ? 1 : 0));
  let current;
  for (let i = 1; i <= n; i++) {
    current = [...new Array(k + 1)].map((_, i) => (i === 0 ? 1 : 0));
    for (let j = 1; j <= k; j++) {
      const coin = coins[i - 1];
      current[j] = prev[j] + (j - coin >= 0 ? current[j - coin] : 0);
    }
    prev = current;
  }

  console.log(current[k]);
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
