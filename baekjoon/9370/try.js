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

  for (const [a, b, d] of edges) {
    connections[a].push({ to: b, weight: d });
    connections[b].push({ to: a, weight: d });
  }

  const queue = [{ p: s, weight: 0, history: `${s},` }];
  const checked = [...new Array(n + 1)].map(() => ({
    weight: "INF",
    history: [""],
  }));
  checked[s] = { weight: 0, history: [`${s},`] };

  while (queue.length > 0) {
    const { p, weight, history } = popFrom(queue);

    for (const next of connections[p]) {
      const item = checked[next.to];
      if (item.weight === "INF" || item.weight > next.weight + weight) {
        const newHistory = `${history}${next.to},`;
        checked[next.to] = {
          weight: next.weight + weight,
          history: [newHistory],
        };
        pushTo(
          {
            p: next.to,
            weight: checked[next.to].weight,
            history: newHistory,
          },
          queue
        );
      } else if (item.weight === next.weight + weight) {
        if (checked[next.to].history.indexOf(history) === -1) {
          const newHistory = `${history}${next.to},`;
          checked[next.to] = {
            weight: next.weight + weight,
            history: [...checked[next.to].history, newHistory],
          };
          pushTo(
            {
              p: next.to,
              weight: checked[next.to].weight,
              history: newHistory,
            },
            queue
          );
        }
      }
    }
  }

  const result = [];
  for (const target of targets) {
    for (const path of checked[target].history) {
      if (path.includes(`${g},${h}`) || path.includes(`${h},${g}`)) {
        result.push(target);
        break;
      }
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
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
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
