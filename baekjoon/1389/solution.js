function solution(n, m, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [a, b] of rows) {
    connections[a].push(b);
    connections[b].push(a);
  }

  let min = Infinity;
  let minIdx = 0;

  for (let i = 1; i <= n; i++) {
    const answers = [...new Array(n + 1)].map(() => -1);
    answers[i] = 0;
    const queue = [i];
    let qidx = 0;
    while (queue.length > qidx) {
      const item = queue[qidx++];

      for (let conn of connections[item]) {
        if (answers[conn] === -1) {
          answers[conn] = answers[item] + 1;
          queue.push(conn);
        }
      }
    }

    const sum = answers.slice(1).reduce((acc, item) => acc + item, 0);
    if (min > sum) {
      min = sum;
      minIdx = i;
    }
  }
  console.log(minIdx);
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
