function solution(n, rows) {
  const nodes = [...new Array(n + 1)].map(() => new Map());

  for (const [p, c, w] of rows) {
    nodes[p].set(c, w);
  }

  let max = 0;

  const travel = (m) => {
    const maxLengths = [0, 0];
    for (const [c, w] of nodes[m].entries()) {
      const length = travel(c) + w;
      if (maxLengths[0] <= length) {
        [maxLengths[0], maxLengths[1]] = [length, maxLengths[0]];
      } else if (maxLengths[1] < length) {
        maxLengths[1] = length;
      }
    }
    const diameter = maxLengths[0] + maxLengths[1];
    if (max < diameter) {
      max = diameter;
    }

    return maxLengths[0];
  };

  travel(1);

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
  const rows = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  solution(n, rows);
}
