function solution(n) {
  if (n === 1) {
    console.log(1);
    return;
  }

  const queue = [...new Array(n)].map((_, i) => i + 1);
  const result = [];

  while (queue.length > 0) {
    result.push(queue.shift());
    if (queue.length === 1) {
      console.log(`${result.join(" ")} ${queue[0]}`);
      return;
    }
    queue.push(queue.shift());
  }
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
    solution(+item);
  });
} else {
  solution(+input);
}
