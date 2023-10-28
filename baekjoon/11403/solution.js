function solution(n, rows) {
  const connections = [...new Array(n)].map(() => []);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i][j] === 1) {
        connections[i].push(j);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const queue = [...connections[i]];
    let qidx = 0;
    while (queue.length > qidx) {
      const item = queue[qidx++];

      for (let j = 0; j < n; j++) {
        if (rows[item][j] === 1 && rows[i][j] === 0) {
          rows[i][j] = 1;
          queue.push(j);
        }
      }
    }
  }

  console.log(rows.map((row) => row.join(" ")).join("\n"));
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
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
