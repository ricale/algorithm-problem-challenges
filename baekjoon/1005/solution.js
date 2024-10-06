function getAnswer(n, k, delays, orders, w) {
  const nodes = [...new Array(n + 1)].map((_, i) => ({
    count: 0,
    time: i > 0 ? delays[i - 1] : 0,
    parentTime: 0,
    to: new Set(),
  }));

  for (const [x, y] of orders) {
    nodes[x].to.add(y);
    nodes[y].count += 1;
  }

  const queue = [];

  for (let i = 1; i <= n; i++) {
    if (nodes[i].count === 0) {
      if (i === w) {
        return nodes[i].time;
      }
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const idx = queue.shift();
    const item = nodes[idx];

    const itemTime = item.time + item.parentTime;

    for (const nextIdx of item.to) {
      const next = nodes[nextIdx];
      if (next.parentTime < itemTime) {
        next.parentTime = itemTime;
      }
      next.count -= 1;
      if (next.count === 0) {
        if (nextIdx === w) {
          return next.time + next.parentTime;
        }
        queue.push(nextIdx);
      }
    }
  }
}

function solution(t, cases) {
  let result = "";
  for (const [n, k, delays, orders, w] of cases) {
    result += `${getAnswer(n, k, delays, orders, w)}\n`;
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

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const [n, k] = lines[idx++].split(" ").map((it) => +it);
    const delays = lines[idx++].split(" ").map((it) => +it);
    const orders = lines.slice(idx, idx + k).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += k;
    const w = +lines[idx++];
    cases.push([n, k, delays, orders, w]);
  }

  solution(t, cases);
}
