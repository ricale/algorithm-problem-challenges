function findRoot(value, graph) {
  if (graph[value] === value) {
    return value;
  }
  graph[value] = findRoot(graph[value], graph);
  return graph[value];
}

function solution(n, m, rows) {
  const graph = [...new Array(n + 1)].map((_, i) => i);

  let result = "";
  for (const [comm, a, b] of rows) {
    switch (comm) {
      case 0: {
        const rootA = findRoot(a, graph);
        const rootB = findRoot(b, graph);
        graph[rootB] = rootA;
        break;
      }
      case 1: {
        result += `${
          findRoot(a, graph) === findRoot(b, graph) ? "YES" : "NO"
        }\n`;
        break;
      }
    }
  }
  console.log(result);
}

//////
////
// input

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("./input.txt"),
  // output: process.stdout,
});

const input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  const [[n, m], ...rows] = input
    .filter((item) => !!item)
    .map((row) => row.split(" ").map((it) => +it));

  solution(n, m, rows);

  process.exit();
});
