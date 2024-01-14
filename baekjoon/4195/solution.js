const getRoot = (name, roots) => {
  const currentRoot = roots.get(name) || name;
  if (currentRoot === name) {
    roots.set(name, name);
    return name;
  }
  const root = getRoot(currentRoot, roots);
  roots.set(name, root);
  return root;
};

function getResult(f, connections) {
  let result = "";
  const roots = new Map();
  const counts = new Map();

  for (const [n1, n2] of connections) {
    const r1 = getRoot(n1, roots);
    const r1Count = counts.get(r1) || 1;
    const r2 = getRoot(n2, roots);
    const r2Count = counts.get(r2) || 1;
    if (r1 !== r2) {
      roots.set(r1, r2);
      const sum = r1Count + r2Count;
      counts.set(r2, sum);
      result += `${sum}\n`;
    } else {
      result += `${r1Count}\n`;
    }
  }

  return result;
}

function solution(n, rows) {
  let result = "";
  for (const [f, connections] of rows) {
    result += `${getResult(f, connections)}`;
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
  const n = +cases[idx++];
  const rows = [];
  for (let i = 0; i < n; i++) {
    const f = +cases[idx++];
    rows.push([
      f,
      cases.slice(idx, idx + f).map((item) => {
        return item.trim().split(" ");
      }),
    ]);
    idx += f;
  }

  solution(n, rows);
}
