// 플로이드-워셜

function getAnswer(n, m, w, roads, holes) {
  const connections = [...new Array(n + 1)].map(() => new Map());
  const results = [...new Array(n + 1)].map(() =>
    new Array(n + 1).fill(Infinity)
  );

  for (const [s, e, t] of roads) {
    const prev = connections[s].get(e);
    if (prev !== undefined && prev < t) {
      continue;
    }
    connections[s].set(e, t);
    connections[e].set(s, t);
    results[s][e] = t;
    results[e][s] = t;
  }

  for (const [s, e, t] of holes) {
    connections[s].set(e, -t);
    results[s][e] = -t;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        results[j][k] = Math.min(results[j][k], results[j][i] + results[i][k]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (results[i][i] < 0) {
      return "YES";
    }
  }

  return "NO";
}

function solution(n, inputs) {
  let result = "";
  for (const { n, m, w, roads, holes } of inputs) {
    result += `${getAnswer(n, m, w, roads, holes)}\n`;
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
  const tc = +cases[idx++];

  const inputs = [];
  for (let i = 0; i < tc; i++) {
    const [n, m, w] = cases[idx++].split(" ").map((item) => +item);
    const roads = cases.slice(idx, idx + m).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += m;
    const holes = cases.slice(idx, idx + w).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += w;
    inputs.push({ n, m, w, roads, holes });
  }

  solution(tc, inputs);
}
