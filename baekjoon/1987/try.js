function solution(r, c, rows) {
  const queue = [{ y: 0, x: 0, chars: rows[0][0] }];
  let max = 1;
  while (queue.length) {
    const item = queue.pop();

    const cands = [
      [item.y + 1, item.x],
      [item.y - 1, item.x],
      [item.y, item.x + 1],
      [item.y, item.x - 1],
    ];

    for (const [ny, nx] of cands) {
      if (
        ny >= 0 &&
        ny < r &&
        nx >= 0 &&
        nx < c &&
        !item.chars.includes(rows[ny][nx])
      ) {
        queue.push({ y: ny, x: nx, chars: `${item.chars}${rows[ny][nx]}` });
        max = Math.max(max, item.chars.length + 1);
      }
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
  const [r, c] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + r).map((item) => {
    return item;
  });
  idx += r;

  solution(r, c, rows);
}
