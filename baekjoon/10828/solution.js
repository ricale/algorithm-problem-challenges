function solution(n, rows) {
  const stack = [];

  const result = [];
  for (const [command, item] of rows) {
    switch (command) {
      case "push":
        stack.push(item);
        break;
      case "pop":
        result.push(stack.pop(item) ?? "-1");
        break;
      case "size":
        result.push(stack.length);
        break;
      case "empty":
        result.push(stack.length === 0 ? "1" : "0");
        break;
      case "top":
        result.push(stack.length === 0 ? "-1" : stack[stack.length - 1]);
        break;
    }
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
    return it.trim().split(" ");
  });
  solution(n, rows);

  idx += n + offset;
}
