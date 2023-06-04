function solution(n, rows) {
  const queue = [];
  let front = 0;
  let back = 0;

  let result = "";
  for (const [command, item] of rows) {
    switch (command) {
      case "push":
        queue.push(item);
        back += 1;
        break;
      case "pop":
        if (front === back) {
          result += `-1\n`;
        } else {
          result += `${queue[front]}\n`;
          front += 1;
        }
        break;
      case "size":
        result += `${back - front}\n`;
        break;
      case "empty":
        result += `${front === back ? 1 : 0}\n`;
        break;
      case "front":
        result += `${front === back ? -1 : queue[front]}\n`;
        break;
      case "back":
        result += `${front === back ? -1 : queue[back - 1]}\n`;
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
