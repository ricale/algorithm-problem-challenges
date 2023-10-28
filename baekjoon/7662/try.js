const forAsc = (a = Infinity, b = Infinity) => a > b;
const forDesc = (a = -Infinity, b = -Infinity) => a < b;

function popFrom(queue, idx, comparator) {
  const result = queue[idx];

  queue[idx] = queue[queue.length - 1];
  queue.length -= 1;

  if (idx === queue.length - 1) {
    return result;
  }

  while (idx < queue.length) {
    const rIdx = (idx + 1) * 2;
    const lIdx = rIdx - 1;
    const curr = queue[idx];
    const lval = queue[lIdx];
    const rval = queue[rIdx];

    if (comparator(curr, lval) && (comparator(rval, lval) || rval === lval)) {
      [queue[idx], queue[lIdx]] = [queue[lIdx], queue[idx]];
      idx = lIdx;
    } else if (comparator(curr, rval)) {
      [queue[idx], queue[rIdx]] = [queue[rIdx], queue[idx]];
      idx = rIdx;
    } else {
      break;
    }
  }

  return result;
}

function pushTo(queue, value, comparator) {
  let idx = queue.length;
  queue[queue.length] = value;

  while (idx > 0) {
    const pIdx = Math.ceil(idx / 2) - 1;
    if (comparator(queue[pIdx], queue[idx])) {
      [queue[pIdx], queue[idx]] = [queue[idx], queue[pIdx]];
      idx = pIdx;
    } else {
      break;
    }
  }

  return idx;
}

function solution(n, rows) {
  let result = "";
  for (let i = 0; i < n; i++) {
    const [k, commands] = rows[i];

    const ascQueue = [];
    const descQueue = [];
    for (const [comm, value] of commands) {
      switch (comm) {
        case "I":
          pushTo(ascQueue, value, forAsc);
          pushTo(descQueue, value, forDesc);
          break;
        case "D":
          if (ascQueue.length === 0) {
            break;
          }
          if (value === -1) {
            const popped = popFrom(ascQueue, 0, forAsc);
            const idx = descQueue.lastIndexOf(popped);
            popFrom(descQueue, idx, forDesc);
          } else {
            const popped = popFrom(descQueue, 0, forDesc);
            const idx = ascQueue.lastIndexOf(popped);
            popFrom(ascQueue, idx, forAsc);
          }
          break;
      }
    }

    result +=
      ascQueue.length === 0 ? "EMPTY\n" : `${descQueue[0]} ${ascQueue[0]}\n`;
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx++];

  const rows = [];
  for (let i = 0; i < n; i++) {
    const k = +cases[idx++];
    const lines = cases.slice(idx, idx + k).map((item) => {
      const [comm, num] = item.split(" ");
      return [comm, +num];
    });
    idx += k;
    rows.push([k, lines]);
  }

  solution(n, rows);
}
