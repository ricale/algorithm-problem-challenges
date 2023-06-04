function solution(n, rows) {
  const deque = [];
  let front = 10001;
  let rear = 10001;

  const result = [];
  for (const [command, value] of rows) {
    switch (command) {
      case "push_front":
        front -= 1;
        deque[front] = value;
        break;
      case "push_back":
        deque[rear] = value;
        rear += 1;
        break;
      case "pop_front":
        result.push(front === rear ? -1 : deque[front++]);
        break;
      case "pop_back":
        result.push(front === rear ? -1 : deque[--rear]);
        break;
      case "size":
        result.push(rear - front);
        break;
      case "empty":
        result.push(front === rear ? 1 : 0);
        break;
      case "front":
        result.push(front === rear ? -1 : deque[front]);
        break;
      case "back":
        result.push(front === rear ? -1 : deque[rear - 1]);
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item.trim().split(" ");
  });
  solution(n, rows);

  idx += n + offset;
}
