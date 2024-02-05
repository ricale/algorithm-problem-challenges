function solution(n, r, q, edges, queries) {
  const nodes = [...new Array(n + 1)].map(() => []);
  for (const [u, v] of edges) {
    nodes[u].push(v);
    nodes[v].push(u);
  }

  const childrenCount = [...new Array(n + 1)].fill(null);
  const checked = [...new Array(n + 1)].fill(false);
  checked[r] = true;

  const findChildrenCount = (node) => {
    childrenCount[node] = 0;

    for (const next of nodes[node]) {
      if (checked[next]) {
        continue;
      }
      checked[next] = true;
      findChildrenCount(next);
      childrenCount[node] += childrenCount[next] + 1;
    }
  };

  findChildrenCount(r);

  console.log(
    queries.reduce((acc, q) => `${acc}${childrenCount[q] + 1}\n`, "")
  );
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
  const [n, r, q] = cases[idx++].split(" ").map((it) => +it);
  const edges = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;
  const queries = cases.slice(idx, idx + q).map((item) => {
    return +item;
  });
  idx += q;

  solution(n, r, q, edges, queries);
}
