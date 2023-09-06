function solution(n, m, rows) {
  const checked0 = [...new Array(n)].map(() => new Array(m).fill(0));
  checked0[0][0] = 1;
  const checked1 = [...new Array(n)].map(() => new Array(m).fill(0));

  const queue = [[0, 0, 0]];
  let qidx = 0;

  while (
    queue.length > qidx &&
    checked0[n - 1][m - 1] === 0 &&
    checked1[n - 1][m - 1] === 0
  ) {
    const [y, x, breakWall] = queue[qidx++];

    const nexts = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (const [ny, nx] of nexts) {
      if (breakWall < 1) {
        if (checked0[ny]?.[nx] !== 0) {
          continue;
        }
        if (rows[ny]?.[nx] === "0") {
          checked0[ny][nx] = checked0[y][x] + 1;
          queue.push([ny, nx, breakWall]);
        } else if (rows[ny]?.[nx] === "1") {
          checked0[ny][nx] = checked0[y][x] + 1;
          checked1[ny][nx] = checked0[y][x] + 1;
          queue.push([ny, nx, breakWall + 1]);
        }
      } else {
        if (checked1[ny]?.[nx] !== 0) {
          continue;
        }
        if (checked0[ny]?.[nx] === undefined) {
          continue;
        }
        if (rows[ny]?.[nx] === "0") {
          checked1[ny][nx] = checked1[y][x] + 1;
          queue.push([ny, nx, breakWall]);
        }
      }
    }
  }

  const dest0 = checked0[n - 1][m - 1];
  const dest1 = checked1[n - 1][m - 1];
  console.log(
    dest0 === 0 && dest1 === 0
      ? -1
      : dest0 === 0
      ? dest1
      : dest1 === 0
      ? dest0
      : Math.min(dest0, dest1)
  );
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item.trim().split("");
  });
  solution(n, m, rows);

  idx += n + offset;
}
