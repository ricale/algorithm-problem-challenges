function solution(n, populations, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [a, b] of rows) {
    connections[a].push(b);
    connections[b].push(a);
  }

  const answers = new Array(n).fill(null);

  const getAnswer = (node) => {
    answers[node] = [populations[node - 1], 0];

    for (const next of connections[node]) {
      if (answers[next]) {
        continue;
      }
      getAnswer(next);
      answers[node][0] += answers[next][1];
      answers[node][1] += Math.max(answers[next][0], answers[next][1]);
    }
  };

  getAnswer(1);

  console.log(Math.max(...answers[1]));
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
  const populations = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  solution(n, populations, rows);
}
