function solution(n, m, b, rows) {
  let min = 256;
  let max = 0;

  for (let row of rows) {
    for (let cell of row) {
      if (min > cell) {
        min = cell;
      }
      if (max < cell) {
        max = cell;
      }
    }
  }

  let minSeconds = Infinity;
  let height;

  for (let target = min; target <= max; target++) {
    let seconds = 0;
    let blocks = b;

    for (let row of rows) {
      for (let cell of row) {
        if (cell > target) {
          blocks += cell - target;
          seconds += (cell - target) * 2;
        } else if (cell < target) {
          blocks -= target - cell;
          seconds += target - cell;
        }
      }
    }

    if (blocks >= 0 && minSeconds >= seconds) {
      minSeconds = seconds;
      height = target;
    }
  }

  console.log(`${minSeconds} ${height}`);
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
  const [n, m, b] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, b, rows);

  idx += n + offset;
}
