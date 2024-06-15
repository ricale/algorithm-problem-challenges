// BFS, 시간 초과

function getCands(a, b) {
  const result = [];
  if (a.x !== b.x) {
    result.push([{ ...b }, { y: b.y, x: b.x + 1 }]);
  }

  if (a.y !== b.y) {
    result.push([{ ...b }, { y: b.y + 1, x: b.x }]);
  }

  return [...result, [{ ...b }, { y: b.y + 1, x: b.x + 1 }]];
}

function isDiagonal(a, b) {
  return a.y !== b.y && a.x !== b.x;
}

function solution(n, rows) {
  const queue = [
    [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
    ],
  ];

  let result = 0;
  while (queue.length > 0) {
    const coords = queue.shift();

    const cands = getCands(...coords);

    for (let [coord1, coord2] of cands) {
      if (
        coord2.y < 0 ||
        coord2.y >= n ||
        coord2.x < 0 ||
        coord2.x >= n ||
        rows[coord2.y][coord2.x] === "1"
      ) {
        continue;
      }
      if (
        isDiagonal(coord1, coord2) &&
        (rows[coord1.y][coord2.x] === "1" || rows[coord2.y][coord1.x] === "1")
      ) {
        continue;
      }
      if (coord2.y === n - 1 && coord2.x === n - 1) {
        result += 1;
        continue;
      }
      queue.push([coord1, coord2]);
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item.trim().split(" ");
  });
  idx += n;

  solution(n, rows);
}
