function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  if (!queue.length) {
    return result;
  }

  let idx = 0;
  while (true) {
    const lIdx = (idx + 1) * 2;
    const rIdx = (idx + 1) * 2 + 1;
    const cw = queue[idx].weight;
    const lw = queue[lIdx]?.weight || Infinity;
    const rw = queue[rIdx]?.weight || Infinity;

    if (cw > lw && rw >= lw) {
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

function solution(n, rows) {
  const connections = [...new Array(n)].map(() => []);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const weight = Math.sqrt(
        Math.pow(rows[j][1] - rows[i][1], 2) +
          Math.pow(rows[j][0] - rows[i][0], 2)
      );
      connections[i].push({ to: j, weight });
      connections[j].push({ to: i, weight });
    }
  }

  const checked = new Array(n).fill(false);
  const queue = [{ to: 0, weight: 0 }];
  let sum = 0;

  while (queue.length > 0) {
    const item = popFrom(queue);

    if (checked[item.to]) {
      continue;
    }
    checked[item.to] = true;

    sum += item.weight;

    for (const nextItem of connections[item.to]) {
      if (!checked[nextItem]) {
        pushTo(queue, nextItem);
      }
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
