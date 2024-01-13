function getTreeCount(n, edges) {
  const checked = new Array(n + 1).fill(false);
  const connections = [...new Array(n + 1)].map(() => []);

  const isTree = (idx, parentIdx) => {
    checked[idx] = true;

    for (const next of connections[idx]) {
      if (!checked[next]) {
        if (!isTree(next, idx)) {
          return false;
        }
      } else if (next !== parentIdx) {
        return false;
      }
    }

    return true;
  };

  for (const [n1, n2] of edges) {
    connections[n1].push(n2);
    connections[n2].push(n1);
  }

  let result = 0;
  for (let i = 1; i <= n; i++) {
    if (checked[i]) {
      continue;
    }
    if (isTree(i)) {
      result += 1;
    }
  }

  return result;
}

function solution(rows) {
  let result = "";
  let num = 1;
  let i = 0;
  while (i < rows.length && rows[i][0] !== 0) {
    const [nodeCount, edgeCount] = rows[i];
    const caseResult = getTreeCount(nodeCount, rows.slice(++i, i + edgeCount));
    if (caseResult > 1) {
      result += `Case ${num}: A forest of ${caseResult} trees.\n`;
    } else if (caseResult === 1) {
      result += `Case ${num}: There is one tree.\n`;
    } else {
      result += `Case ${num}: No trees.\n`;
    }
    i += edgeCount;
    num += 1;
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

const rows = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
solution(rows);
