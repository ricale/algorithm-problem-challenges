function solution(k, n, rows) {
  let left = 0;
  let right = Math.max(...rows);
  let max = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    const count = rows.reduce((acc, item) => acc + Math.floor(item / mid), 0);
    if (count < n) {
      right = mid - 1;
    } else {
      left = mid + 1;
      max = Math.max(max, mid);
    }
  }

  console.log(max);
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
