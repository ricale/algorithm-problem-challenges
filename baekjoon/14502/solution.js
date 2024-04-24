function isValid(value) {
  return value !== 1 && value !== 2;
}

function travel(rows, y, x, v) {
  const queue = [[y, x]];
  let qidx = 0;
  while (queue.length > qidx) {
    const item = queue[qidx++];

    const nexts = [
      [item[0] + 1, item[1]],
      [item[0] - 1, item[1]],
      [item[0], item[1] + 1],
      [item[0], item[1] - 1],
    ];

    for (const [ny, nx] of nexts) {
      if (
        ny >= 0 &&
        ny < rows.length &&
        nx >= 0 &&
        nx < rows[0].length &&
        rows[ny][nx] !== 1 &&
        rows[ny][nx] !== 2 &&
        rows[ny][nx] !== v
      ) {
        rows[ny][nx] = v;
        queue.push([ny, nx]);
      }
    }
  }
}

function getAnswer(rows, c) {
  const v = c + 2;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === 2) {
        travel(rows, i, j, v);
      }
    }
  }

  return rows.reduce((acc, row) => {
    return acc + row.filter((item) => isValid(item) && item !== v).length;
  }, 0);
}

function solution(n, m, rows) {
  const last = n * m;
  let c = 0;
  let max = 0;
  for (let i = 0; i < last - 2; i++) {
    const iy = Math.floor(i / m);
    const ix = i % m;
    if (!isValid(rows[iy][ix])) {
      continue;
    }
    rows[iy][ix] = 1;
    for (let j = i + 1; j < last - 1; j++) {
      const jy = Math.floor(j / m);
      const jx = j % m;
      if (!isValid(rows[jy][jx])) {
        continue;
      }
      rows[jy][jx] = 1;
      for (k = j + 1; k < last; k++) {
        const ky = Math.floor(k / m);
        const kx = k % m;
        if (!isValid(rows[ky][kx])) {
          continue;
        }
        rows[ky][kx] = 1;
        max = Math.max(max, getAnswer(rows, ++c));
        rows[ky][kx] = 0;
      }
      rows[jy][jx] = 0;
    }
    rows[iy][ix] = 0;
  }

  console.log(max);
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
