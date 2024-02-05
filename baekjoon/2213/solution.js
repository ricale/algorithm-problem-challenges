function solution(n, weights, edges) {
  const connections = [...new Array(n + 1)].map(() => []);
  for (const [a, b] of edges) {
    connections[a].push(b);
    connections[b].push(a);
  }

  const checked = [...new Array(n + 1)].fill(null);

  const findMax = (node) => {
    checked[node] = [
      { nodes: [node], weight: weights[node - 1] },
      { nodes: [], weight: 0 },
    ];
    for (const next of connections[node]) {
      if (checked[next] !== null) {
        continue;
      }
      findMax(next);

      checked[node][0].weight += checked[next][1].weight;
      checked[node][0].nodes.push(...checked[next][1].nodes);

      const maxOfChild =
        checked[next][0].weight > checked[next][1].weight
          ? checked[next][0]
          : checked[next][1];
      checked[node][1].weight += maxOfChild.weight;
      checked[node][1].nodes.push(...maxOfChild.nodes);
    }
  };

  findMax(1);

  const max =
    checked[1][0].weight > checked[1][1].weight ? checked[1][0] : checked[1][1];

  console.log(`${max.weight}\n${max.nodes.sort((a, b) => a - b).join(" ")}`);
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
  const weights = cases[idx++].split(" ").map((it) => +it);
  const edges = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  solution(n, weights, edges);
}
