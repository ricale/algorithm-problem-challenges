function update(tree, index, diff, start, end, node) {
  tree[node] += 1;
  if (start === end) {
    return;
  }
}

function solution(n, cases) {
  for (const [n, m, videos] of cases) {
    console.log(n, m, videos);
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const [n, m] = lines[idx++].split(" ").map((it) => +it);
    const videos = lines[idx++].split(" ").map((it) => +it);
    cases.push([n, m, videos]);
  }

  solution(t, cases);
}
