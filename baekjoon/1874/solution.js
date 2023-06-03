function solution(n, rows) {
  const stack = [];
  const commands = [];

  while (rows.length > 0) {
    if (stack[stack.length - 1] !== n) {
      stack.push(rows.pop());
      commands.push("-");
    } else if (stack[stack.length - 1] === n) {
      stack.pop();
      commands.push("+");
      n -= 1;
    }
  }

  while (stack.length > 0 && stack[stack.length - 1] === n) {
    stack.pop();
    commands.push("+");
    n -= 1;
  }

  console.log(stack.length > 0 ? "NO" : commands.reverse().join("\n"));
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
