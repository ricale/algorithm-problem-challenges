function dnq(rows, x1, y1, x2, y2) {
  if (x1 === x2 && y1 === y2) {
    return rows[y1][x1];
  }

  const midX = Math.floor((x1 + x2) / 2);
  const midY = Math.floor((y1 + y2) / 2);
  const topLeft = dnq(rows, x1, y1, midX, midY);
  const topRight = dnq(rows, midX + 1, y1, x2, midY);
  const bottomLeft = dnq(rows, x1, midY + 1, midX, y2);
  const bottomRight = dnq(rows, midX + 1, midY + 1, x2, y2);

  if (
    topLeft.length === 1 &&
    topLeft === topRight &&
    topLeft === bottomLeft &&
    topLeft === bottomRight
  ) {
    return topLeft;
  }

  return `(${topLeft}${topRight}${bottomLeft}${bottomRight})`;
}

function solution(n, rows) {
  console.log(dnq(rows, 0, 0, n - 1, n - 1));
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
  const rows = cases.slice(idx + offset, idx + n + offset);

  solution(n, rows);

  idx += n + offset;
}
