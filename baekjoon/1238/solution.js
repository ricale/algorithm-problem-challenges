function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  let idx = 0;
  while (idx < queue.length) {
    const lidx = (idx + 1) * 2 - 1;
    const ridx = (idx + 1) * 2;
    const cw = queue[idx].weight;
    const lw = queue[lidx]?.weight ?? Infinity;
    const rw = queue[ridx]?.weight ?? Infinity;

    if (cw > lw && rw >= lw) {
      [queue[idx], queue[lidx]] = [queue[lidx], queue[idx]];
      idx = lidx;
    } else if (cw > rw) {
      [queue[idx], queue[ridx]] = [queue[ridx], queue[idx]];
      idx = ridx;
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
    const pidx = Math.ceil(idx / 2) - 1;
    const cw = queue[idx].weight;
    const pw = queue[pidx].weight;

    if (pw > cw) {
      [queue[idx], queue[pidx]] = [queue[pidx], queue[idx]];
      idx = pidx;
    } else {
      break;
    }
  }
}

function getGoWeight(n, x, routes) {
  const result = new Array(n + 1).fill(0);
  result[x] = Infinity;
  let resultCount = 0;

  const checked = new Array(n + 1).fill(0);
  const queue = [{ point: x, weight: 0 }];
  while (queue.length) {
    const item = popFrom(queue);
    if (checked[item.point] === 1) {
      continue;
    }
    checked[item.point] = 1;

    if (result[item.point] === 0) {
      result[item.point] = item.weight;
      resultCount += 1;
      if (resultCount === n - 1) {
        break;
      }
    }

    for (const [dest, weight] of routes[item.point].entries()) {
      if (checked[dest] === 1) {
        continue;
      }
      pushTo(queue, { point: dest, weight: item.weight + weight });
    }
  }
  return result;
}

function solution(n, m, x, rows) {
  const routes1 = [...new Array(n + 1)].map(() => new Map());
  for (const [a, b, t] of rows) {
    routes1[b].set(a, t);
  }
  const result1 = getGoWeight(n, x, routes1);
  const routes2 = [...new Array(n + 1)].map(() => new Map());
  for (const [a, b, t] of rows) {
    routes2[a].set(b, t);
  }
  const result2 = getGoWeight(n, x, routes2);

  let max = 0;
  for (let i = 1; i <= n; i++) {
    if (i === x) {
      continue;
    }
    max = Math.max(max, result1[i] + result2[i]);
  }
  console.log(max);
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
  const [n, m, x] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, x, rows);
}
