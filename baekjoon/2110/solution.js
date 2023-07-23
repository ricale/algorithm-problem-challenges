function solution(n, c, houses) {
  houses.sort((a, b) => a - b);

  const length = houses[houses.length - 1] - houses[0];
  let left = 0;
  let right = Math.floor(length / (c - 1));
  let max = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let count = 1;
    let last = houses[0];
    for (let i = 1; i < houses.length && count < c; i++) {
      if (houses[i] - last >= mid) {
        count += 1;
        last = houses[i];
      }
    }

    if (count < c) {
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
  const [n, c] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, c, rows);

  idx += n + offset;
}
