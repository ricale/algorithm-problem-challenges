function getSameLevelNode(nodes, sparse, n1, level) {
  const diff = nodes[n1].level - level;

  const length = diff.toString(2).length;

  let found = n1;
  for (let i = 0; i < length; i++) {
    if (diff & (1 << i)) {
      found = sparse[i][found];
    }
  }

  return found;
}

function findAnswer(nodes, sparse, n1, n2) {
  let r1 = n1;
  let r2 = n2;
  while (true) {
    const level = nodes[r1].level;
    const length = level.toString(2).length;
    let checked = false;

    // TODO(kangseong): i 값을 0부터 시작하는 방식은 불가능한지 확인
    for (let i = length - 1; i >= 0; i--) {
      if (sparse[i][r1] !== sparse[i][r2]) {
        r1 = sparse[i][r1];
        r2 = sparse[i][r2];
        checked = true;
        break;
      }
    }

    if (!checked) {
      return nodes[r1].parent;
    }
  }
}

function getAnswer(nodes, sparse, n1, n2) {
  const n1Level = nodes[n1].level;
  const n2Level = nodes[n2].level;

  const [r1, r2] =
    n1Level > n2Level
      ? [getSameLevelNode(nodes, sparse, n1, n2Level), n2]
      : n1Level < n2Level
      ? [n1, getSameLevelNode(nodes, sparse, n2, n1Level)]
      : [n1, n2];

  if (r1 === r2) {
    return r1;
  }

  return findAnswer(nodes, sparse, r1, r2);
}

function solution(n, lines, m, queries) {
  const nodes = [...new Array(n + 1)].map(() => ({
    level: undefined,
    parent: undefined,
    children: new Set(),
  }));

  for (const [p, c] of lines) {
    nodes[p].children.add(c);
    nodes[c].children.add(p);
  }

  const queue = [[1, 0]];
  nodes[1].level = 0;
  let maxLevel = 0;

  while (queue.length > 0) {
    const [idx, level] = queue.shift();

    for (const childIdx of nodes[idx].children) {
      const child = nodes[childIdx];
      if (child.level !== undefined) {
        continue;
      }

      child.level = level + 1;
      child.children.delete(idx);
      child.parent = idx;
      maxLevel = level + 1;
      queue.push([childIdx, level + 1]);
    }
  }

  const sparse = [nodes.map((node) => node.parent)];

  const length = maxLevel.toString(2).length;
  for (let i = 1; i < length; i++) {
    sparse[i] = [];
    for (let j = 1; j <= n; j++) {
      sparse[i][j] = sparse[i - 1][j]
        ? sparse[i - 1][sparse[i - 1][j]]
        : undefined;
    }
  }

  let result = "";
  for (const [n1, n2] of queries) {
    const subResult = getAnswer(nodes, sparse, n1, n2);
    result += `${subResult}\n`;
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
  const lines = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;
  const m = +cases[idx++];
  const queries = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, lines, m, queries);
}
