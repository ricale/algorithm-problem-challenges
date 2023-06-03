function solution(n, rows) {
  const result = [];

  for (const line of rows) {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "(") {
        stack.push(line[i]);
      } else if (stack.length === 0) {
        stack.push(line[i]);
        break;
      } else {
        stack.pop();
      }
    }
    result.push(stack.length === 0 ? "YES" : "NO");
  }
  console.log(result.join("\n"));
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
    return it;
  });
  solution(n, rows);

  idx += n + offset;
}
