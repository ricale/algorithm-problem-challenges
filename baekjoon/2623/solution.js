function solution(n, m, rows) {
  const nodes = [...new Array(n + 1)].map(() => ({
    count: 0,
    to: new Set(),
  }));

  for (const row of rows) {
    for (let i = 0; i < row.length - 1; i++) {
      const current = row[i];
      for (let j = i + 1; j < row.length; j++) {
        const next = row[j];

        if (!nodes[current].to.has(next)) {
          nodes[current].to.add(next);
          nodes[next].count += 1;
        }
      }
    }
  }

  const queue = [];

  for (let i = 1; i <= n; i++) {
    if (nodes[i].count === 0) {
      queue.push(i);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const idx = queue.shift();

    result.push(idx);

    for (const nextIdx of nodes[idx].to) {
      nodes[nextIdx].count -= 1;
      if (nodes[nextIdx].count === 0) {
        queue.push(nextIdx);
      }
    }
  }

  if (result.length < n) {
    console.log("0");
  } else {
    console.log(result.join("\n"));
  }
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
      .slice(1)
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
