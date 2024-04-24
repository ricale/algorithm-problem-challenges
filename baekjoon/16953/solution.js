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

    if (cw < pw) {
      [queue[idx], queue[pidx]] = [queue[pidx], queue[idx]];
      idx = pidx;
    } else {
      break;
    }
  }
}

function solution(a, b) {
  const queue = [{ value: a, weight: 1 }];

  const checked = new Map();
  while (queue.length > 0) {
    const item = popFrom(queue);

    const cands = [item.value * 2, item.value * 10 + 1];
    for (const cand of cands) {
      if (cand > b) {
        continue;
      }

      if (checked.get(cand)) {
        continue;
      }
      checked.set(cand, 1);

      if (cand === b) {
        console.log(item.weight + 1);
        return;
      }
      pushTo(queue, { value: cand, weight: item.weight + 1 });
    }
  }

  console.log(-1);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
