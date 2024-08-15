const BLANK = " ";
const CHEESE = "C";

function melt(rows, y, x, idx) {
  const queue = [[y, x]];
  rows[y][x] = idx;
  let meltedCount = 0;

  while (queue.length > 0) {
    const item = queue.shift();

    const cands = [
      [item[0] + 1, item[1]],
      [item[0] - 1, item[1]],
      [item[0], item[1] + 1],
      [item[0], item[1] - 1],
    ];

    for (const [y2, x2] of cands) {
      if (y2 < 0 || y2 >= rows.length || x2 < 0 || x2 >= rows[0].length) {
        continue;
      }
      if (rows[y2][x2] === BLANK || rows[y2][x2] === idx - 1) {
        rows[y2][x2] = idx;
        queue.push([y2, x2]);
      } else if (rows[y2][x2] === CHEESE) {
        rows[y2][x2] = { idx, count: 1 };
      } else if (rows[y2][x2].count === 1) {
        if (rows[y2][x2].idx === idx) {
          rows[y2][x2] = idx;
          meltedCount += 1;
        } else {
          rows[y2][x2] = { idx, count: 1 };
        }
      }
    }
  }

  return meltedCount;
}

function solution(n, m, rows) {
  let cheeseCount = rows.reduce(
    (acc, row) =>
      acc + row.reduce((acc2, item) => acc2 + (item === CHEESE ? 1 : 0), 0),
    0
  );
  let idx = 0;

  while (cheeseCount > 0) {
    cheeseCount -= melt(rows, 0, 0, ++idx);
  }

  console.log(idx);
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
      .map((it) => (it === "0" ? BLANK : CHEESE));
  });
  idx += n;

  solution(n, m, rows);
}
