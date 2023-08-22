function traversal(board, y, x) {
  const stack = [[x, y]];

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    board[y][x] = 2;

    if (board[y][x - 1] === 1) {
      stack.push([x - 1, y]);
    }
    if (board[y][x + 1] === 1) {
      stack.push([x + 1, y]);
    }
    if (board[y - 1]?.[x] === 1) {
      stack.push([x, y - 1]);
    }
    if (board[y + 1]?.[x] === 1) {
      stack.push([x, y + 1]);
    }
  }
}

function solution(t, rows) {
  let result = "";
  for (const { m, n, k, items } of rows) {
    const board = [...new Array(n)].map(() => new Array(m).fill(0));
    for (const [x, y] of items) {
      board[y][x] = 1;
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === 1) {
          traversal(board, i, j);
          count += 1;
        }
      }
    }
    result += `${count}\n`;
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
  const t = +cases[idx++];
  const rows = [];
  while (rows.length < t) {
    const [m, n, k] = cases[idx++].split(" ").map((it) => +it);
    const items = cases
      .slice(idx, idx + k)
      .map((item) => item.split(" ").map((it) => +it));
    rows.push({
      m,
      n,
      k,
      items,
    });
    idx += k;
  }

  solution(t, rows);
}
