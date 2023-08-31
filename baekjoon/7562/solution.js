function solution(n, rows) {
  let result = "";
  for (let i = 0; i < n; i++) {
    const [l] = rows[i * 3];
    const [sy, sx] = rows[i * 3 + 1];
    const [ey, ex] = rows[i * 3 + 2];

    let count = 1;
    const queue = [{ x: sx, y: sy, count }];
    const board = [...new Array(l)].map(() => new Array(l).fill(0));
    board[sy][sx] = count;

    while (board[ey][ex] === 0) {
      const { y, x, count } = queue.shift();

      const nexts = [
        [y - 1, x - 2],
        [y - 2, x - 1],
        [y - 2, x + 1],
        [y - 1, x + 2],
        [y + 1, x - 2],
        [y + 2, x - 1],
        [y + 2, x + 1],
        [y + 1, x + 2],
      ];
      const nextCount = count + 1;
      for (const [ny, nx] of nexts) {
        if (ny >= 0 && ny < l && nx >= 0 && nx < l && board[ny][nx] === 0) {
          board[ny][nx] = nextCount;
          queue.push({ y: ny, x: nx, count: nextCount });
        }
      }
    }
    result += `${board[ey][ex] - 1}\n`;
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
  const rows = cases.slice(idx + offset, idx + n * 3 + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n * 3 + offset;
}
