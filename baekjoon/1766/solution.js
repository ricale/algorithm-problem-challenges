function pushTo(queue, item) {
  queue.push(item);

  let idx = queue.length - 1;

  while (idx > 0) {
    const pidx = Math.ceil(idx / 2) - 1;

    if (queue[pidx] > queue[idx]) {
      [queue[pidx], queue[idx]] = [queue[idx], queue[pidx]];
      idx = pidx;
    } else {
      break;
    }
  }
}

function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  let idx = 0;

  while ((idx + 1) * 2 - 1 < queue.length) {
    const lidx = (idx + 1) * 2 - 1;
    const ridx = (idx + 1) * 2;
    const current = queue[idx];
    const left = queue[lidx];
    const right = queue[ridx];

    if (left < current && (!right || left < right)) {
      [queue[lidx], queue[idx]] = [queue[idx], queue[lidx]];
      idx = lidx;
    } else if (right && right < current) {
      [queue[ridx], queue[idx]] = [queue[idx], queue[ridx]];
      idx = ridx;
    } else {
      break;
    }
  }

  return result;
}

function solution(n, m, rows) {
  const nodes = [...new Array(n + 1)].map(() => ({
    count: 0,
    to: new Set(),
  }));

  for (const [newFrom, newTo] of rows) {
    nodes[newFrom].to.add(newTo);
    nodes[newTo].count += 1;
  }

  const queue = [];

  for (let i = 1; i <= n; i++) {
    if (nodes[i].count === 0) {
      pushTo(queue, i);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const idx = popFrom(queue);
    result.push(idx);

    const item = nodes[idx];
    for (const next of item.to) {
      nodes[next].count -= 1;
      if (nodes[next].count === 0) {
        pushTo(queue, next);
      }
    }
  }

  console.log(result.join(" "));
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
