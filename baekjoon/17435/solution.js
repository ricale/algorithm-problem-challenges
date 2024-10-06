function setTable(m, table, length) {
  for (let i = table.length; i < length; i++) {
    table[i] = [];
    for (let j = 1; j <= m; j++) {
      table[i][j] = table[i - 1][table[i - 1][j]];
    }
  }
}

function getAnswer(n, x, table) {
  const maxIdx = n.toString(2).length;
  let result = x;
  for (let i = 0; i <= maxIdx; i++) {
    if (n & (1 << i)) {
      result = table[i][result];
    }
  }
  return result;
}

function solution(m, fs, q, rows) {
  const table = [[undefined, ...fs]];

  let result = "";
  for (const [n, x] of rows) {
    const maxIdx = n.toString(2).length;
    if (table.length < maxIdx) {
      setTable(m, table, maxIdx);
    }
    result += `${getAnswer(n, x, table)}\n`;
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const m = +cases[idx++];
  const fs = cases[idx++].split(" ").map((it) => +it);
  const q = +cases[idx++];
  const rows = cases.slice(idx, idx + q).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += q;

  solution(m, fs, q, rows);
}
