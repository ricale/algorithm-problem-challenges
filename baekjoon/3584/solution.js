function getAnswer(n, rows, [t1, t2]) {
  const nodes = [];

  for (const [a, b] of rows) {
    nodes[b] = { parent: a };
  }

  let n1 = t1;
  while (nodes[n1] !== undefined) {
    nodes[n1].checked = true;
    n1 = nodes[n1].parent;
  }

  let n2 = t2;
  while (nodes[n2] !== undefined && !nodes[n2].checked) {
    n2 = nodes[n2].parent;
  }

  return n2;
}

function solution(t, cases) {
  let result = "";
  for (const [n, rows, targets] of cases) {
    result += `${getAnswer(n, rows, targets)}\n`;
  }
  console.log(result);
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
    const n = +lines[idx++];
    const rows = lines.slice(idx, idx + n - 1).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += n - 1;
    const targets = lines[idx++].split(" ").map((it) => +it);
    cases.push([n, rows, targets]);
  }

  solution(t, cases);
}
