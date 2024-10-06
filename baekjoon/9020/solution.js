function solution(t, rows) {
  const seive = new Array(10001).fill(true);
  for (let i = 2; i < 5000; i++) {
    if (!seive[i]) {
      continue;
    }
    for (let j = i + i; j < 10000; j += i) {
      seive[j] = false;
    }
  }

  let result = "";
  for (const n of rows) {
    let left = 2;
    let right = n - 2;

    let subResult = [];
    while (left <= right) {
      if (!seive[left]) {
        left += 1;
      } else if (!seive[right]) {
        right -= 1;
      } else if (left + right > n) {
        right -= 1;
      } else if (left + right < n) {
        left += 1;
      } else if (left + right === n) {
        subResult = [left, right];
        left += 1;
      }
    }
    result += `${subResult[0]} ${subResult[1]}\n`;
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return +item;
  });
  idx += n;

  solution(n, rows);
}
