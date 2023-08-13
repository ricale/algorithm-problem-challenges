function solution(n, rows) {
  const stack = [];
  let result = "";
  for (const [comm, x] of rows) {
    switch (comm) {
      case 1:
        stack.push(x);
        break;
      case 2:
        result += `${stack.pop(x) ?? "-1"}\n`;
        break;
      case 3:
        result += `${stack.length}\n`;
        break;
      case 4:
        result += `${stack.length === 0 ? 1 : 0}\n`;
        break;
      case 5:
        result += `${stack.length === 0 ? -1 : stack[stack.length - 1]}\n`;
        break;
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
