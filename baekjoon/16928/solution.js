function solution(n, m, rows) {
  const connections = new Array(101).fill(0);

  for (const [from, to] of rows) {
    connections[from] = to;
  }

  const checked = new Array(101).fill(0);
  checked[1] = 1;
  const queue = [1];
  let qidx = 0;
  while (queue.length > qidx) {
    const item = queue[qidx++];

    const max = Math.min(item + 6, 100);

    if (max === 100) {
      console.log(checked[item]);
      return;
    }

    let pushNormal = false;
    for (let i = max; i >= item + 1; i--) {
      if (connections[i]) {
        const next = connections[i];
        if (checked[next] === 0) {
          checked[next] = checked[item] + 1;
          queue.push(next);
        }
      } else if (!pushNormal) {
        if (checked[i] === 0) {
          pushNormal = true;
          checked[i] = checked[item] + 1;
          queue.push(i);
        }
      }
    }
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + m + offset;
}
