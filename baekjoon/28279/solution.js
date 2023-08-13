function solution(n, rows) {
  const deck = new Array(2000002);
  let front = 1000001;
  let rear = 1000001;

  let result = "";
  for (const [comm, x] of rows) {
    switch (comm) {
      case 1:
        front -= 1;
        deck[front] = x;
        break;
      case 2:
        deck[rear] = x;
        rear += 1;
        break;
      case 3:
        if (rear - front > 0) {
          result += `${deck[front]}\n`;
          front += 1;
        } else {
          result += "-1\n";
        }
        break;
      case 4:
        if (rear - front > 0) {
          rear -= 1;
          result += `${deck[rear]}\n`;
        } else {
          result += "-1\n";
        }
        break;
      case 5:
        result += `${rear - front}\n`;
        break;
      case 6:
        result += `${rear - front === 0 ? 1 : 0}\n`;
        break;
      case 7:
        result += `${rear - front === 0 ? -1 : deck[front]}\n`;
        break;
      case 8:
        result += `${rear - front === 0 ? -1 : deck[rear - 1]}\n`;
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
