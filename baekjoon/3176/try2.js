//  1
// (5) (2)
//  9   7
// (1) (3)
//  6   4
// (7) (8) (4)
//  5   10  3
//         (5) (10)
//          8    2

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

  for (let i = 1; i < maxLevel; i++) {
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

  // console.log(nodes);

  const [sparse, minTable, maxTable] = getSparseTable(nodes, maxLevel);

  // console.log(
  //   sparse.map((row, idx1) =>
  //     row.map((item, idx2) => [
  //       item,
  //       minTable[idx1][idx2],
  //       maxTable[idx1][idx2],
  //     ])
  //   )
  // );

  const getItemWithLevel = (nodes, idx, targetLevel) => {
    const diff = nodes[idx].level - targetLevel;

    let itemNode = idx;
    let itemMin = Infinity;
    let itemMax = -Infinity;
    for (let i = diff - 1; i >= 0; i--) {
      if (diff & (1 << i)) {
        itemMin = Math.min(minTable[i][itemNode], itemMin);
        itemMax = Math.max(maxTable[i][itemNode], itemMax);
        itemNode = sparse[i][itemNode];
      }
    }

    return [itemNode, itemMin, itemMax];
  };

  const getItem = (item, original) => {
    const parentNode = sparse[0][item[0]];
    const parentMin = minTable[0][item[0]];
    const parentMax = maxTable[0][item[0]];
    return [
      parentNode,
      Math.min(parentMin, item[1], original[1]),
      Math.max(parentMax, item[2], original[2]),
    ];
  };

  const getAnswer = (nodes, dd, ee) => {
    while (dd[0] !== ee[0]) {
      // console.log(">>> dd", dd);
      // console.log(">>> ee", ee);
      const level = nodes[dd[0]].level;
      const length = level.toString(2).length;
      // console.log(">>> level", level);

      let foundUnmatchedParent = false;
      let matched = 0;
      for (let i = length - 1; i >= 0; i--) {
        if (level & (1 << i)) {
          const itemD = [
            sparse[i][dd[0]],
            minTable[i][dd[0]],
            maxTable[i][dd[0]],
          ];
          const itemE = [
            sparse[i][ee[0]],
            minTable[i][ee[0]],
            maxTable[i][ee[0]],
          ];

          if (itemD[0] === itemE[0]) {
            matched = 1 << 0;
          }

          if (itemD[0] !== itemE[0]) {
            dd = getItem(itemD, dd);
            ee = getItem(itemE, ee);
            foundUnmatchedParent = true;
            break;
          }
        }
      }

      if (!foundUnmatchedParent) {
        dd = getItem(dd, dd);
        ee = getItem(ee, ee);

        if (level & 1) {
          break;
        }
      }
    }

    // console.log(">>> dd", dd);
    // console.log(">>> ee", ee);

    return [dd[0], Math.min(dd[1], ee[1]), Math.max(dd[2], ee[2])];
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
    // console.log({ d, e });
    // console.log({ itemD, itemE });
    const subResult = getAnswer(nodes, itemD, itemE);
    // console.log({ subResult });
    result += `${subResult.slice(1).join(" ")}\n`;
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
