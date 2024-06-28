function getCount(row, col, rows) {
  let min = 64;
  for (let h = 0; h < 2; h++) {
    let count = 0;
    for (let i = row; i < row + 8; i++) {
      for (let j = col; j < col + 8; j++) {
        const value = rows[i][j];
        if (i % 2 === 0) {
          if (j % 2 === h && value !== "B") {
            count += 1;
          } else if (j % 2 !== h && value !== "W") {
            count += 1;
          }
        } else {
          if (j % 2 === h && value !== "W") {
            count += 1;
          } else if (j % 2 !== h && value !== "B") {
            count += 1;
          }
        }
      }
    }
    if (min > count) {
      min = count;
    }
  }

  return min;
}

function solution(n, m, rows) {
  let min = 64;

  for (let i = 0; i <= n - 8; i++) {
    for (let j = 0; j <= m - 8; j++) {
      const count = getCount(i, j, rows);
      if (min > count) {
        min = count;
      }
    }
  }

  console.log(min);
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    const splitted = it.trim().split(" ");
    return splitted.length === 1 ? splitted[0] : splitted;
  });
  solution(n, m, rows);

  idx += n + offset;
}
