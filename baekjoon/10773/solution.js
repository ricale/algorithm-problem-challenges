function solution(n, rows) {
  const stack = [];
  let sum = 0;

  for (const num of rows) {
    if (num === 0) {
      sum -= stack.pop();
    } else {
      sum += num;
      stack.push(num);
    }
  }

  console.log(sum);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return +it;
  });
  solution(n, rows);

  idx += n + offset;
}
