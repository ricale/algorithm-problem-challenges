function solution(m, n, h, rows) {
  const queue = [];
  let total = m * n * h;

  for (let i = 0; i < n * h; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === 1) {
        queue.push([i, j]);
        total -= 1;
      } else if (rows[i][j] === -1) {
        total -= 1;
      }
    }
  }

  let qidx = 0;
  let max = 1;
  while (queue.length > qidx && total > 0) {
    const [_y, x] = queue[qidx++];

    const z = Math.floor(_y / n);
    const y = _y % n;

    const nexts = [
      [y - 1, x, z],
      [y + 1, x, z],
      [y, x - 1, z],
      [y, x + 1, z],
      [y, x, z - 1],
      [y, x, z + 1],
    ];

    const nextCount = rows[_y][x] + 1;
    max = Math.max(max, nextCount);
    for (const [ny, nx, nz] of nexts) {
      const nextY = ny + nz * n;
      if (
        ny >= 0 &&
        ny < n &&
        nx >= 0 &&
        nx < m &&
        nz >= 0 &&
        nz < h &&
        rows[nextY][nx] === 0
      ) {
        rows[nextY][nx] = nextCount;
        total -= 1;
        queue.push([nextY, nx]);
      }
    }
  }

  console.log(total === 0 ? max - 1 : -1);
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
  const [m, n, h] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n * h + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(m, n, h, rows);

  idx += n * h + offset;
}
