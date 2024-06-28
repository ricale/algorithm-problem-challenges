function solution(expression) {
  const queue = expression.split("");
  let qidx = 0;

  const stack = [];

  const solveParentheses = () => {
    let i = stack.length - 2;
    for (; i > 0 && stack[i] !== "("; i--) {}

    const substack = stack.splice(i, stack.length - i);

    let sidx = substack[0] === "(" ? 1 : 0;
    while (substack.length > sidx + 1) {
      const left = substack[sidx++];
      const sign = substack[sidx++];
      substack[sidx] = `${left}${substack[sidx]}${sign}`;
    }
    return substack[substack.length - 1];
  };

  while (qidx < queue.length) {
    const item = queue[qidx++];
    const isSign = item.match(/^[+\-*/()]$/);
    const topItem = stack[stack.length - 1];

    if (!isSign) {
      if (stack.length === 0) {
        stack.push(item);
      } else if (!topItem.match(/^[*/]$/)) {
        stack.push(item);
      } else {
        const sign = stack.pop();
        const lastItem = stack.pop();
        stack.push(`${lastItem}${item}${sign}`);
      }
    } else {
      if (item === ")") {
        const solved = solveParentheses();
        if (stack[stack.length - 1]?.match(/^[*/]$/)) {
          const sign = stack.pop();
          const lastItem = stack.pop();
          stack.push(`${lastItem}${solved}${sign}`);
        } else {
          stack.push(solved);
        }
      } else {
        stack.push(item);
      }
    }
  }

  if (stack.length === 1) {
    console.log(stack[0]);
    return;
  }

  console.log(solveParentheses());
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(item.trim());
  });
} else {
  solution(input.trim());
}
