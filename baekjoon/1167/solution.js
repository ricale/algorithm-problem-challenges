function solution(v, rows) {
  const nodes = [...new Array(v + 1)].map(() => new Map());

  for (const [node, ...conns] of rows) {
    for (let i = 0; i < conns.length && conns[i] !== -1; i += 2) {
      nodes[node].set(conns[i], conns[i + 1]);
    }
  }

  let max = 0;
  const checked = [...new Array(v + 1)].fill(false);

  const travel = (n) => {
    checked[n] = true;
    const maxLengths = [0, 0];
    for (const [key, value] of nodes[n].entries()) {
      if (checked[key]) {
        continue;
      }
      const length = travel(key) + value;
      if (length >= maxLengths[0]) {
        [maxLengths[0], maxLengths[1]] = [length, maxLengths[0]];
      } else if (length > maxLengths[1]) {
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
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
