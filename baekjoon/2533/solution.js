function solution(n, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [u, v] of rows) {
    connections[u].push(v);
    connections[v].push(u);
  }

  const answers = [...new Array(n + 1)].fill(null);

  const getAnswer = (node) => {
    answers[node] = [1, 0];

    for (const next of connections[node]) {
      if (answers[next]) {
        continue;
      }
      getAnswer(next);
      answers[node][0] += Math.min(answers[next][0], answers[next][1]);
      answers[node][1] += answers[next][0];
    }
  };

  getAnswer(1);

  console.log(Math.min(...answers[1]));
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
  const rows = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  solution(n, rows);
}
