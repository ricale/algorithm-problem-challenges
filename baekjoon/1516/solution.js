function solution(n, rows) {
  const nodes = [...new Array(n + 1)].map(() => ({
    count: 0,
    time: 0,
    parentTime: 0,
    to: new Set(),
  }));

  const queue = [];

  for (let i = 1; i <= n; i++) {
    const [time, ...parents] = rows[i - 1];
    nodes[i].count = parents.length;
    nodes[i].time = time;
    for (const parent of parents) {
      nodes[parent].to.add(i);
    }

    if (nodes[i].count === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const idx = queue.shift();
    const item = nodes[idx];

    const itemTime = item.time + item.parentTime;

    for (const nextIdx of item.to) {
      if (nodes[nextIdx].parentTime < itemTime) {
        nodes[nextIdx].parentTime = itemTime;
      }
      nodes[nextIdx].count -= 1;
      if (nodes[nextIdx].count === 0) {
        queue.push(nextIdx);
      }
    }
  }

  console.log(
    nodes
      .slice(1)
      .map((node) => node.time + node.parentTime)
      .join("\n")
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it)
      .slice(0, -1);
  });
  idx += n;

  solution(n, rows);
}
