function solution(n, rows) {
  const dancing = new Set(["ChongChong"]);

  for (let [p1, p2] of rows) {
    if (dancing.has(p1)) {
      dancing.add(p2);
    } else if (dancing.has(p2)) {
      dancing.add(p1);
    }
  }

  console.log(dancing.size);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it.trim().split(" ");
  });
  solution(n, rows);

  idx += n + offset;
}
