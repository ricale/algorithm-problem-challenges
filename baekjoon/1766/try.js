function pushTo(queue, item) {
  queue.push(item);

  let idx = queue.length - 1;

  while (idx > 0) {
    const pidx = Math.ceil(idx / 2) - 1;

    if (queue[pidx].weight > queue[idx].weight) {
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
    const current = queue[idx].weight;
    const left = queue[lidx].weight;
    const right = queue[ridx].weight;

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

  for (const [newTo, newFrom] of rows) {
    nodes[newFrom].to.add(newTo);
    nodes[newTo].count += 1;
  }

  console.log(nodes);

  const parentQueue = [];
  for (let i = 1; i <= n; i++) {
    if (nodes[i].count === 0) {
      parentQueue.push(i);
    }
  }

  let result = "";

  for (const parent of parentQueue) {
    if (nodes[parent].count < 0) {
      continue;
    }

    const queue = [];

    pushTo(queue, { name: parent, weight: -parent });

    const subResult = [];

    while (queue.length > 0) {
      const item = popFrom(queue);
      subResult.push(item.name);

      for (const next of nodes[item.name].to) {
        nodes[next].count -= 1;
        if (nodes[next].count >= 0) {
          nodes[next].count = -1;
          pushTo(queue, { name: next, weight: -next });
        }
      }
    }

    console.log(subResult.join(" "));

    result += `${subResult.reverse().join(" ")} `;
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
