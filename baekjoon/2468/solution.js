function checkLand(rows, checked, drown, c, y, x) {
  const queue = [[y, x]];
  checked[y][x] = c;
  let qidx = 0;
  while (queue.length > qidx) {
    const item = queue[qidx++];

    const cands = [
      [item[0] + 1, item[1]],
      [item[0] - 1, item[1]],
      [item[0], item[1] + 1],
      [item[0], item[1] - 1],
    ];

    for (const [y2, x2] of cands) {
      if (
        y2 >= 0 &&
        y2 < rows.length &&
        x2 >= 0 &&
        x2 < rows.length &&
        rows[y2][x2] > drown &&
        checked[y2][x2] === 0
      ) {
        checked[y2][x2] = c;
        queue.push([y2, x2]);
      }
    }
  }
}

function getSafeAreaCount(rows, drown) {
  const checked = [...new Array(rows.length)].map(() =>
    new Array(rows.length).fill(0)
  );

  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (checked[i][j] === 0 && rows[i][j] > drown) {
        count += 1;
        checkLand(rows, checked, drown, count, i, j);
      }
    }
  }

  return count;
}

function solution(n, rows) {
  const heights = new Array(101).fill(false);
  let maxHeight = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const h = rows[i][j];
      heights[h] = true;
      if (maxHeight < h) {
        maxHeight = h;
      }
    }
  }

  let max = 1;
  for (let i = 1; i < maxHeight; i++) {
    if (heights[i]) {
      max = Math.max(getSafeAreaCount(rows, i), max);
    }
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
