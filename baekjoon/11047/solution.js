function solution(n, k, rows) {
  let result = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (k >= rows[i]) {
      result += Math.floor(k / rows[i]);
      k = k % rows[i];
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
  const [n, k] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, k, rows);

  idx += n + offset;
}
