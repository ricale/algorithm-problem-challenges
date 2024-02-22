function pushTo(queue, item) {
  let idx = queue.length;
  queue.push(item);

  while (idx > 0) {
    const pIdx = Math.ceil(idx / 2) - 1;
    if (queue[pIdx].weight > queue[idx].weight) {
      [queue[pIdx], queue[idx]] = [queue[idx], queue[pIdx]];
      idx = pIdx;
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
    const lIdx = (idx + 1) * 2 - 1;
    const rIdx = (idx + 1) * 2;

    const cw = queue[idx].weight;
    const lw = queue[lIdx]?.weight ?? Infinity;
    const rw = queue[rIdx]?.weight ?? Infinity;

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

function geAnswerForLine(dist, d, t) {
  const checked = new Map();
  const queue = [];

  const item1 = { dist: Math.abs(dist - 1), weight: 1 };
  pushTo(queue, item1);
  checked.set(item1.weight, item1.dist);

  const item2 = { dist: Math.abs(dist - d), weight: t };
  pushTo(queue, item2);
  checked.set(item2.weight, item2.dist);

  while (true) {
    const item = popFrom(queue);
    if (item.dist <= 1) {
      return item.weight + item.dist;
    }

    const next1 = { dist: Math.abs(item.dist - 1), weight: item.weight + 1 };
    const checked1 = checked.get(next1.weight);
    if (checked1 === undefined || checked1 > next1.dist) {
      pushTo(queue, next1);
      checked.set(next1.weight, next1.dist);
    }

    const next2 = { dist: Math.abs(item.dist - d), weight: item.weight + t };
    const checked2 = checked.get(next2.weight);
    if (checked2 === undefined || checked2 > next2.dist) {
      pushTo(queue, next2);
      checked.set(next2.weight, next2.dist);
    }
  }
}

function solution(x, y, d, t) {
  const dist = Math.sqrt(x * x + y * y);
  const result1 = geAnswerForLine(dist, d, t);

  const dividedByD = Math.ceil(dist / d);
  const onlyJumpCount = dividedByD > 1 ? dividedByD : 2;
  const result2 = onlyJumpCount * t;

  console.log(Math.min(result1, result2));
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
