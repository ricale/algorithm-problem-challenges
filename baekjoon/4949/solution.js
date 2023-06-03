function solution(rows) {
  const result = [];
  for (const line of rows) {
    if (line === ".") {
      break;
    }

    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (["[", "("].includes(c)) {
        stack.push(c);
      } else if (c === ")") {
        if (stack[stack.length - 1] !== "(") {
          stack.push(c);
          break;
        } else {
          stack.pop();
        }
      } else if (c === "]") {
        if (stack[stack.length - 1] !== "[") {
          stack.push(c);
          break;
        } else {
          stack.pop();
        }
      }
      // console.log(c, stack.join(""));
    }
    result.push(stack.length === 0 ? "yes" : "no");
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
solution(cases);
