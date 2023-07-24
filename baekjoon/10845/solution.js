function solution(n, rows) {
  let queue = [];
  let result = "";

  for (const [comm, n] of rows) {
    const len = queue.length;
    switch (comm) {
      case "push":
        queue.push(n);
        break;
      case "pop":
        if (len === 0) {
          result += "-1\n";
        } else {
          result += `${queue.shift()}\n`;
        }
        break;
      case "size":
        result += `${len}\n`;
        break;
      case "empty":
        result += `${len ? 0 : 1}\n`;
        break;
      case "front":
        result += `${queue[0] ?? -1}\n`;
        break;
      case "back":
        result += `${len ? queue[len - 1] : -1}\n`;
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
    return item.trim().split(" ");
  });
  solution(n, rows);

  idx += n + offset;
}
