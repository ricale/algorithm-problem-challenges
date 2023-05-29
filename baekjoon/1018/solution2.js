function getCount(row, col, rows, allMin) {
  let typeW = 0;
  let typeB = 0;
  for (let i = row; i < row + 8; i++) {
    for (let j = col; j < col + 8; j++) {
      const value = rows[i][j];
      if ((i + j) % 2 === 0) {
        if (value === "W") {
          typeB += 1;
        } else {
          typeW += 1;
        }
      } else {
        if (value === "B") {
          typeB += 1;
        } else {
          typeW += 1;
        }
      }
      if (typeW > allMin && typeB > allMin) {
        return typeW;
      }
    }
  }
  return Math.min(typeW, typeB);
}

function solution(n, m, rows) {
  let min = 64;

  for (let i = 0; i <= n - 8; i++) {
    for (let j = 0; j <= m - 8; j++) {
      const count = getCount(i, j, rows, min);
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
