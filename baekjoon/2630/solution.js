function dnq(rows, x1, y1, x2, y2) {
  if (x1 === x2 && y1 === y2) {
    const result = [0, 0];
    result[rows[y1][x1]] = 1;
    return result;
  }

  const midX = Math.floor((x1 + x2) / 2);
  const midY = Math.floor((y1 + y2) / 2);

  const topLeft = dnq(rows, x1, y1, midX, midY);
  const topRight = dnq(rows, midX + 1, y1, x2, midY);
  const bottomLeft = dnq(rows, x1, midY + 1, midX, y2);
  const bottomRight = dnq(rows, midX + 1, midY + 1, x2, y2);

  if (
    topLeft[0] === 1 &&
    topRight[0] === 1 &&
    bottomLeft[0] === 1 &&
    bottomRight[0] === 1 &&
    topLeft[1] === 0 &&
    topRight[1] === 0 &&
    bottomLeft[1] === 0 &&
    bottomRight[1] === 0
  ) {
    return [1, 0];
  }

  if (
    topLeft[1] === 1 &&
    topRight[1] === 1 &&
    bottomLeft[1] === 1 &&
    bottomRight[1] === 1 &&
    topLeft[0] === 0 &&
    topRight[0] === 0 &&
    bottomLeft[0] === 0 &&
    bottomRight[0] === 0
  ) {
    return [0, 1];
  }

  const result = [
    topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0],
    topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1],
  ];
  return result;
}

function solution(n, rows) {
  console.log(dnq(rows, 0, 0, n - 1, n - 1).join("\n"));
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
