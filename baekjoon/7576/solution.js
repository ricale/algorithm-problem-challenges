function solution(m, n, tomatoes) {
  const queue = [];
  let qidx = 0;
  let total = m * n;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (tomatoes[i][j] === 1) {
        queue.push({ y: i, x: j });
        total -= 1;
      } else if (tomatoes[i][j] === -1) {
        total -= 1;
      }
    }
  }

  let result = 1;

  while (queue.length > qidx && total > 0) {
    const { y, x } = queue[qidx++];

    const nexts = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    const nextCount = tomatoes[y][x] + 1;
    result = Math.max(result, nextCount);
    for (const [ny, nx] of nexts) {
      if (tomatoes[ny]?.[nx] === 0) {
        total -= 1;
        tomatoes[ny][nx] = nextCount;
        queue.push({ y: ny, x: nx });
      }
    }
  }

  console.log(total === 0 ? result - 1 : -1);
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
  const [m, n] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(m, n, rows);

  idx += n + offset;
}
