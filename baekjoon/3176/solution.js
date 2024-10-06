function getSparseTable(nodes, maxLevel) {
  const sparse = [
    nodes.map((node, idx) => {
      if (idx === 0) {
        return;
      }
      return node.parent;
    }),
  ];
  const minTable = [
    nodes.map((node, idx) => {
      if (idx === 0) {
        return;
      }
      const dist = nodes[node.parent].children.get(idx);
      return dist ?? Infinity;
    }),
  ];
  const maxTable = [
    nodes.map((node, idx) => {
      if (idx === 0) {
        return;
      }
      const dist = nodes[node.parent].children.get(idx);
      return dist ?? -Infinity;
    }),
  ];

  const len = maxLevel.toString(2).length;

  for (let i = 1; i < len; i++) {
    sparse[i] = [];
    minTable[i] = [];
    maxTable[i] = [];
    for (j = 1; j <= sparse[0].length; j++) {
      const prevNode = sparse[i - 1][j];
      const prevMin = minTable[i - 1][j];
      const prevMax = maxTable[i - 1][j];

      if (prevNode === null || prevNode === undefined) {
        sparse[i][j] = null;
        minTable[i][j] = null;
        maxTable[i][j] = null;
        continue;
      }

      const currNode = sparse[i - 1][prevNode];
      const currMin = minTable[i - 1][prevNode];
      const currMax = maxTable[i - 1][prevNode];

      if (currNode === null || currNode === undefined) {
        sparse[i][j] = null;
        minTable[i][j] = null;
        maxTable[i][j] = null;
        continue;
      }

      sparse[i][j] = currNode;
      minTable[i][j] = Math.min(prevMin, currMin);
      maxTable[i][j] = Math.max(prevMax, currMax);
    }
  }

  return [sparse, minTable, maxTable];
}

function solution(n, routes, k, queries) {
  const nodes = [...new Array(n + 1)].map(() => ({
    level: 0,
    parent: 0,
    children: new Map(),
  }));

  for (const [a, b, c] of routes) {
    nodes[a].children.set(b, c);
    nodes[b].children.set(a, c);
  }

  nodes[1].level = 1;
  const queue = [1];
  const checked = [];

  let maxLevel = 0;

  while (queue.length > 0) {
    const idx = queue.shift();

    const children = nodes[idx].children.keys();
    for (const child of children) {
      if (checked[child]) {
        nodes[idx].children.delete(child);
      } else {
        nodes[child].children.delete(idx);
        nodes[child].level = nodes[idx].level + 1;
        nodes[child].parent = idx;
        maxLevel = Math.max(maxLevel, nodes[child].level);
        queue.push(child);
      }
    }
  }

  const [sparse, minTable, maxTable] = getSparseTable(nodes, maxLevel);

  const getItemWithLevel = (nodes, idx, targetLevel) => {
    const diff = nodes[idx].level - targetLevel;
    const length = diff.toString(2).length;

    let itemNode = idx;
    let itemMin = Infinity;
    let itemMax = -Infinity;
    for (let i = length - 1; i >= 0; i--) {
      if (diff & (1 << i)) {
        itemMin = Math.min(minTable[i][itemNode], itemMin);
        itemMax = Math.max(maxTable[i][itemNode], itemMax);
        itemNode = sparse[i][itemNode];
      }
    }

    return [itemNode, itemMin, itemMax];
  };

  const getAnswer = (nodes, dd, ee, min, max) => {
    if (dd === ee) {
      return [min, max];
    }
    const level = nodes[dd].level;
    const length = level.toString(2).length;

    for (let i = length - 1; i >= 0; i--) {
      if (sparse[i][dd] !== sparse[i][ee]) {
        min = Math.min(min, minTable[i][dd], minTable[i][ee]);
        max = Math.max(max, maxTable[i][dd], maxTable[i][ee]);
        dd = sparse[i][dd];
        ee = sparse[i][ee];
      }
    }

    return [
      Math.min(min, minTable[0][dd], minTable[0][ee]),
      Math.max(max, maxTable[0][dd], maxTable[0][ee]),
    ];
  };

  let result = "";
  for (const [d, e] of queries) {
    const [itemD, itemE] =
      nodes[d].level > nodes[e].level
        ? [getItemWithLevel(nodes, d, nodes[e].level), [e, Infinity, -Infinity]]
        : nodes[d].level < nodes[e].level
        ? [[d, Infinity, -Infinity], getItemWithLevel(nodes, e, nodes[d].level)]
        : [
            [d, Infinity, -Infinity],
            [e, Infinity, -Infinity],
          ];

    const subResult = getAnswer(
      nodes,
      itemD[0],
      itemE[0],
      Math.min(itemD[1], itemE[1]),
      Math.max(itemD[2], itemE[2])
    );
    result += `${subResult.join(" ")}\n`;
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
  const routes = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  const k = +cases[idx++];
  const queries = cases.slice(idx, idx + k).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += k;

  solution(n, routes, k, queries);
}
