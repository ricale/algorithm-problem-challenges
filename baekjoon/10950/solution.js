function solution(n, rows) {
  let result = "";
  for (let row of rows) {
    result += `${+row[0] + +row[1]}\n`;
  }
  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

const cases = input.split("\n").filter((it) => !!it);

if (isLocal) {
  let idx = 0;
  while (idx < cases.length) {
    const n = +cases[idx];
    solution(
      n,
      cases.slice(idx + 1, idx + n + 1).map((it) => it.trim().split(" "))
    );
    idx += n + 1;
  }
} else {
  const n = +cases[0];
  solution(
    n,
    cases.slice(1, n + 1).map((it) => it.trim().split(" "))
  );
}
