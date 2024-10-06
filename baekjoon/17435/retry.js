function updateSparseTable(sparse, n) {
  const max = n.toString(2).length;

  for (let i = sparse.length; i < max; i++) {
    sparse[i] = [];
    for (let j = 1; j <= sparse[0].length; j++) {
      sparse[i][j] = sparse[i - 1][sparse[i - 1][j]];
    }
  }
}

function getAnswer(sparse, n, x) {
  const max = n.toString(2).length;

  let result = x;
  for (let i = 0; i < max; i++) {
    if (n & (1 << i)) {
      result = sparse[i][result];
    }
  }
  return result;
}

function solution(m, fs, q, rows) {
  const sparse = [[undefined, ...fs]];
  let result = "";
  for (const [n, x] of rows) {
    updateSparseTable(sparse, n);
    result += `${getAnswer(sparse, n, x)}\n`;
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
