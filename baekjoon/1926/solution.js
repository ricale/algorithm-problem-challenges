function solution(n, m, rows) {
  let count = 0;
  let max = 0;

  const travel = (y, x) => {
    const queue = [[y, x]];
    rows[y][x] = 2;
    let area = 1;

    while (queue.length) {
      const coord = queue.shift();

      const cands = [
        [coord[0] - 1, coord[1]],
        [coord[0] + 1, coord[1]],
        [coord[0], coord[1] - 1],
        [coord[0], coord[1] + 1],
      ];

      for (const [ny, nx] of cands) {
        if (ny < n && ny >= 0 && nx < m && nx >= 0 && rows[ny][nx] === 1) {
          rows[ny][nx] = 2;
          area += 1;
          queue.push([ny, nx]);
        }
      }
    }

    return area;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === 1) {
        count += 1;
        max = Math.max(max, travel(i, j));
      }
    }
  }

  console.log(`${count}\n${max}`);
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, m, rows);
}
