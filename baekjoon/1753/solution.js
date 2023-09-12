function pushToQueue(item, queue) {
  let idx = queue.length;
  queue.push(item);

  while (idx > 0) {
    const aboveIdx = Math.ceil(idx / 2) - 1;
    if (queue[aboveIdx].weight > queue[idx].weight) {
      [queue[aboveIdx], queue[idx]] = [queue[idx], queue[aboveIdx]];
      idx = aboveIdx;
    } else {
      break;
    }
  }
}

function popFromQueue(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  let idx = 0;

  while (true) {
    const lIdx = (idx + 1) * 2 - 1;
    const rIdx = (idx + 1) * 2;
    const lWeight = queue[lIdx]?.weight ?? Infinity;
    const rWeight = queue[rIdx]?.weight ?? Infinity;

    if (lWeight === Infinity && rWeight === Infinity) {
      break;
    }

    if (lWeight < queue[idx].weight && lWeight <= rWeight) {
      [queue[lIdx], queue[idx]] = [queue[idx], queue[lIdx]];
      idx = lIdx;
    } else if (rWeight < queue[idx].weight) {
      [queue[rIdx], queue[idx]] = [queue[idx], queue[rIdx]];
      idx = rIdx;
    } else {
      break;
    }
  }

  return result;
}

function solution(v, e, k, rows) {
  const connections = [...new Array(v + 1)].map(() => []);

  for (const [u1, v1, w1] of rows) {
    connections[u1].push({ to: v1, weight: w1 });
  }

  const answers = new Array(v + 1).fill("INF");
  answers[k] = 0;

  let queue = [{ p: k, weight: 0 }];

  while (queue.length > 0) {
    const { p: item, weight: itemWeight } = popFromQueue(queue);

    for (const { to, weight } of connections[item]) {
      if (answers[to] === "INF" || answers[to] > itemWeight + weight) {
        answers[to] = itemWeight + weight;
        pushToQueue({ p: to, weight: itemWeight + weight }, queue);
      }
    }
  }

  console.log(answers.slice(1).join("\n"));
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
  const k = +cases[idx++];
  const rows = cases.slice(idx, idx + e).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(v, e, k, rows);

  idx += e;
}
