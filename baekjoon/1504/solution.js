function pushTo(item, queue) {
  let idx = queue.length;
  queue.push(item);

  while (idx > 0) {
    const parentIdx = Math.ceil(idx / 2) - 1;
    if (queue[idx].weight < queue[parentIdx].weight) {
      [queue[idx], queue[parentIdx]] = [queue[parentIdx], queue[idx]];
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
  while (true) {
    const rIdx = (idx + 1) * 2;
    const lIdx = rIdx - 1;
    const rWeight = queue[rIdx]?.weight ?? Infinity;
    const lWeight = queue[lIdx]?.weight ?? Infinity;

    if (rWeight === Infinity && lWeight === Infinity) {
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

function solution(n, e, v1, v2, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [a, b, c] of rows) {
    connections[a].push({ to: b, weight: c });
    connections[b].push({ to: a, weight: c });
  }

  const getDistances = (start) => {
    const queue = [{ p: start, weight: 0 }];
    const answers = [...new Array(n + 1)].fill("INF");
    answers[start] = 0;

    while (queue.length > 0) {
      const item = popFrom(queue);

      for (const cand of connections[item.p]) {
        if (
          answers[cand.to] === "INF" ||
          answers[cand.to] > item.weight + cand.weight
        ) {
          answers[cand.to] = item.weight + cand.weight;
          pushTo({ p: cand.to, weight: item.weight + cand.weight }, queue);
        }
      }
    }

    return answers;
  };

  const fromOne = getDistances(1);
  const oneToV1 = fromOne[v1];
  const oneToV2 = fromOne[v2];
  const fromV1 = getDistances(v1);
  const v1ToV2 = fromV1[v2];
  const v1ToN = fromV1[n];
  const fromV2 = getDistances(v2);
  const v2ToN = fromV2[n];

  const answer1 = +oneToV1 + +v1ToV2 + +v2ToN;
  const answer2 = +oneToV2 + +v1ToV2 + +v1ToN;

  if (isNaN(answer1) && isNaN(answer2)) {
    console.log(-1);
  } else if (isNaN(answer2)) {
    console.log(answer1);
  } else if (isNaN(answer1)) {
    console.log(answer2);
  } else {
    console.log(Math.min(answer1, answer2));
  }
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
  const [n, e] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + e).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += e;
  const [v1, v2] = cases[idx++].split(" ").map((it) => +it);

  solution(n, e, v1, v2, rows);
}
