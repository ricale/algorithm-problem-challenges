function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  if (queue.length === 0) {
    return result;
  }

  let idx = 0;
  while (true) {
    const lIdx = (idx + 1) * 2 - 1;
    const rIdx = (idx + 1) * 2;
    const cw = queue[idx].weight;
    const lw = queue[lIdx]?.weight ?? Infinity;
    const rw = queue[rIdx]?.weight ?? Infinity;

    if (cw > lw && lw <= rw) {
      [queue[idx], queue[lIdx]] = [queue[lIdx], queue[idx]];
      idx = lIdx;
    } else if (cw > rw) {
      [queue[idx], queue[rIdx]] = [queue[rIdx], queue[idx]];
      idx = rIdx;
    } else {
      break;
    }
  }

  return result;
}

function pushTo(queue, item) {
  queue.push(item);
  let idx = queue.length - 1;

  while (idx > 0) {
    const pIdx = Math.ceil(idx / 2) - 1;
    const cw = queue[idx].weight;
    const pw = queue[pIdx].weight;

    if (cw < pw) {
      [queue[idx], queue[pIdx]] = [queue[pIdx], queue[idx]];
      idx = pIdx;
    } else {
      break;
    }
  }
}

function solution(v, e, rows) {
  const connections = [...new Array(v + 1)].map(() => []);
  for (const [a, b, c] of rows) {
    connections[a].push({ to: b, weight: c });
    connections[b].push({ to: a, weight: c });
  }

  const checked = new Array(v + 1).fill(false);

  const queue = [{ to: 1, weight: 0 }];
  let sum = 0;
  while (queue.length > 0) {
    const item = popFrom(queue);
    if (checked[item.to]) {
      continue;
    }
    checked[item.to] = true;
    sum += item.weight;

    for (const nextItem of connections[item.to]) {
      pushTo(queue, nextItem);
    }
  }

  console.log(sum);
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
  const [v, e] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + e).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += e;

  solution(v, e, rows);
}
