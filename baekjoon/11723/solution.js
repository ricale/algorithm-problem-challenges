function solution(n, rows) {
  const set = new Array(21).fill(0);
  let result = "";
  for (const [comm, x] of rows) {
    switch (comm) {
      case "add":
        set[x] = 1;
        break;
      case "remove":
        set[x] = 0;
        break;
      case "check":
        result += `${set[x]}\n`;
        break;
      case "toggle":
        set[x] = set[x] === 1 ? 0 : 1;
        break;
      case "all":
        for (let i = 1; i <= 20; i++) {
          set[i] = 1;
        }
        break;
      case "empty":
        for (let i = 1; i <= 20; i++) {
          set[i] = 0;
        }
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
      .map((it, i) => (i === 0 ? it : +it));
  });
  solution(n, rows);

  idx += n + offset;
}
