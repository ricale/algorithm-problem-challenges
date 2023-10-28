function bfs(rows, targets, check, queue) {
  const [y, x] = queue[0];
  rows[y][x] = check;

  let qidx = 0;
  while (queue.length > qidx) {
    const [y, x] = queue[qidx++];
    const cands = [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ];

    for (const [y2, x2] of cands) {
      if (
        y2 >= 0 &&
        y2 < rows.length &&
        x2 >= 0 &&
        x2 < rows.length &&
        targets.includes(rows[y2][x2])
      ) {
        rows[y2][x2] = check;
        queue.push([y2, x2]);
      }
    }
  }
}

function searchAndFindBlockCount(rows, targets, check) {
  let count = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (targets.includes(rows[i][j])) {
        bfs(rows, targets, check, [[i, j]]);
        count += 1;
      }
    }
  }

  return count;
}

function solution(n, rows) {
  const blueCount = searchAndFindBlockCount(rows, ["B"], "1");
  const redCount = searchAndFindBlockCount(rows, ["R"], "2");
  const greenCount = searchAndFindBlockCount(rows, ["G"], "3");
  const redAndGreenCount = searchAndFindBlockCount(rows, ["2", "3"], "4");

  const nonColorWeaknessCount = blueCount + redCount + greenCount;
  const colorWeaknessCount = blueCount + redAndGreenCount;

  console.log(`${nonColorWeaknessCount} ${colorWeaknessCount}`);
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
    return item.trim().split("");
  });
  idx += n;

  solution(n, rows);
}
