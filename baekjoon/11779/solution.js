function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  let idx = 0;

  while (idx < queue.length) {
    const lIdx = idx + 1 * 2 - 1;
    const rIdx = idx + 1 * 2;

    const curr = queue[idx].weight;
    const left = queue[lIdx]?.weight ?? Infinity;
    const right = queue[rIdx]?.weight ?? Infinity;

    if (curr > left && right > left) {
      [queue[idx], queue[lIdx]] = [queue[lIdx], queue[idx]];
      idx = lIdx;
    } else if (curr > right) {
      [queue[idx], queue[rIdx]] = [queue[rIdx], queue[idx]];
      idx = rIdx;
    } else {
      break;
    }
  }

  return result;
}

function pushTo(queue, item) {
  let idx = queue.length;
  queue[idx] = item;

  while (idx > 0) {
    const pIdx = Math.ceil(idx / 2) - 1;
    const curr = queue[idx].weight;
    const parent = queue[pIdx].weight;

    if (parent > curr) {
      [queue[idx], queue[pIdx]] = [queue[pIdx], queue[idx]];
      idx = pIdx;
    } else {
      break;
    }
  }
}

function solution(n, m, s, e, rows) {
  const connections = [...new Array(n + 1)].map(() => new Map());

  for (const [from, to, cost] of rows) {
    const prev = connections[from].get(to);
    if (prev === undefined || prev > cost) {
      connections[from].set(to, cost);
    }
  }

  const checked = [...new Array(n + 1)].fill(null);
  checked[s] = { prev: null, weight: 0 };
  const queue = [{ id: s, weight: 0 }];

  while (queue.length > 0) {
    const item = popFrom(queue);

    for (const [dest, cost] of connections[item.id].entries()) {
      if (checked[dest] === null || checked[dest].weight > item.weight + cost) {
        checked[dest] = { prev: item.id, weight: item.weight + cost };
        pushTo(queue, { id: dest, weight: checked[dest].weight });
      }
    }
  }

  let checkedItem = checked[e];
  const result = [e];
  while (checkedItem.prev) {
    result.push(checkedItem.prev);
    checkedItem = checked[checkedItem.prev];
  }

  console.log(
    `${checked[e].weight}\n${result.length}\n${result.reverse().join(" ")}`
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
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;
  const [s, e] = cases[idx++].split(" ").map((it) => +it);

  solution(n, m, s, e, rows);
}
