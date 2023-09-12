function pushTo(item, queue) {
  let idx = queue.length;
  queue.push(item);

  while (idx > 0) {
    const parentIdx = Math.ceil(idx / 2) - 1;
    if (queue[parentIdx].weight > queue[idx].weight) {
      [queue[parentIdx], queue[idx]] = [queue[idx], queue[parentIdx]];
      idx = parentIdx;
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
  while (queue.length > 0) {
    const rIdx = (idx + 1) * 2;
    const lIdx = rIdx - 1;
    const rw = queue[rIdx]?.weight ?? Infinity;
    const lw = queue[lIdx]?.weight ?? Infinity;
    const cw = queue[idx].weight;

    if (lw < cw && lw <= rw) {
      [queue[lIdx], queue[idx]] = [queue[idx], queue[lIdx]];
      idx = lIdx;
    } else if (rw < cw) {
      [queue[rIdx], queue[idx]] = [queue[idx], queue[rIdx]];
      idx = rIdx;
    } else {
      break;
    }
  }

  return result;
}

function solution(from, to) {
  if (from === to) {
    console.log(0);
    return;
  }

  const queue = [{ p: from, weight: 0 }];
  const checked = new Array(100001).fill(Infinity);

  while (queue.length > 0) {
    const item = popFrom(queue);

    const cands =
      item.p > to
        ? [{ p: item.p - 1, weight: item.weight + 1 }]
        : [
            { p: item.p * 2, weight: item.weight },
            { p: item.p + 1, weight: item.weight + 1 },
            { p: item.p - 1, weight: item.weight + 1 },
          ];

    for (const cand of cands) {
      if (cand.p >= 0 && cand.p <= 100000 && checked[cand.p] > cand.weight) {
        checked[cand.p] = cand.weight;
        if (cand.p !== to) {
          pushTo(cand, queue);
        }
      }
    }
  }

  console.log(checked[to]);
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
