function pushTo(item, queue) {
  let idx = queue.length - 1;
  queue.push(item);

  while (idx > 0) {
    const parentIdx = Math.ceil(idx / 2) - 1;
    const pw = queue[parentIdx].weight;
    const cw = queue[idx].weight;

    if (cw < pw) {
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

  if (queue.length === 0) {
    return result;
  }

  let idx = 0;
  while (true) {
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

function getAnswer({ n, m, t, s, g, h, edges, targets }) {
  const connections = [...new Array(n + 1)].map(() => []);

  let ghDist = 0;
  for (const [a, b, d] of edges) {
    connections[a].push({ to: b, weight: d });
    connections[b].push({ to: a, weight: d });
    if ((a === g && b === h) || (a === h && b === g)) {
      ghDist = d;
    }
  }

  const queue1 = [{ p: s, weight: 0 }];
  const fromS = [...new Array(n + 1)].map(() => "INF");
  fromS[s] = 0;

  while (queue1.length > 0) {
    const { p, weight } = popFrom(queue1);

    for (const next of connections[p]) {
      if (fromS[next.to] === "INF" || fromS[next.to] > next.weight + weight) {
        fromS[next.to] = next.weight + weight;
        pushTo(
          {
            p: next.to,
            weight: fromS[next.to],
          },
          queue1
        );
      }
    }
  }

  const result = [];

  for (const target of targets) {
    const queue2 = [{ p: target, weight: 0 }];
    const fromT = [...new Array(n + 1)].map(() => "INF");
    fromT[target] = 0;

    while (queue2.length > 0) {
      const { p, weight } = popFrom(queue2);

      for (const next of connections[p]) {
        if (fromT[next.to] === "INF" || fromT[next.to] > next.weight + weight) {
          fromT[next.to] = next.weight + weight;
          pushTo(
            {
              p: next.to,
              weight: fromT[next.to],
            },
            queue2
          );
        }
      }
    }

    if (
      fromS[target] === fromS[g] + fromT[h] + ghDist ||
      fromS[target] === fromS[h] + fromT[g] + ghDist
    ) {
      result.push(target);
    }
  }

  return result.sort((a, b) => a - b);
}

function solution(T, rows) {
  let result = "";
  for (const row of rows) {
    result += `${getAnswer(row).join(" ")}\n`;
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
  const T = +cases[idx++];
  const rows = [];

  for (let i = 0; i < T; i++) {
    const [n, m, t] = cases[idx++].split(" ").map((it) => +it);
    const [s, g, h] = cases[idx++].split(" ").map((it) => +it);
    const edges = cases.slice(idx, idx + m).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += m;
    const targets = cases.slice(idx, idx + t).map((item) => {
      return +item.trim();
    });
    idx += t;

    rows.push({
      n,
      m,
      t,
      s,
      g,
      h,
      edges,
      targets,
    });
  }

  solution(T, rows);
}
