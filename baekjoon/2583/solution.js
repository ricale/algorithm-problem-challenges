const EMPTY = -1;
const WALL = 0;

function fill(board, v, x, y) {
  board[y][x] = v;
  const queue = [[y, x]];

  let count = 1;
  while (queue.length > 0) {
    const [y1, x1] = queue.shift();

    const cands = [
      [y1 + 1, x1],
      [y1 - 1, x1],
      [y1, x1 + 1],
      [y1, x1 - 1],
    ];

    for (let [ny, nx] of cands) {
      if (board[ny]?.[nx] === EMPTY) {
        board[ny][nx] = v;
        count += 1;
        queue.push([ny, nx]);
      }
    }
  }
  return count;
}

function solution(m, n, k, rows) {
  const board = [...new Array(m)].map(() => new Array(n).fill(EMPTY));

  for (let [x1, y1, x2, y2] of rows) {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        board[y][x] = WALL;
      }
    }
  }

  let count = 0;
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === EMPTY) {
        result.push(fill(board, ++count, j, i));
      }
    }
  }

  console.log(`${count}\n${result.sort((a, b) => a - b).join(" ")}`);
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
  const [m, n, k] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + k).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += k;

  solution(m, n, k, rows);
}
