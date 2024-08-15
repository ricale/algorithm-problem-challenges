const IMPOSSIBLE = "IMPOSSIBLE";

function getAnswer(n, nums, m, rows) {
  if (m === 0) {
    return nums.join(" ");
  }

  const nodes = [...new Array(n + 1)].map(() => ({
    count: 0,
    to: new Set(),
  }));

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    nodes[current].count = i;
    for (let j = i + 1; j < nums.length; j++) {
      nodes[current].to.add(nums[j]);
    }
  }

  for (const [a, b] of rows) {
    const [newFrom, newTo] = nodes[a].to.has(b) ? [b, a] : [a, b];

    nodes[newFrom].count -= 1;
    nodes[newTo].to.delete(newFrom);

    nodes[newTo].count += 1;
    nodes[newFrom].to.add(newTo);
  }

  const queue = [];

  for (let i = 1; i <= n; i++) {
    if (nodes[i].count === 0) {
      queue.push(i);
    }
  }

  if (queue.length > 1) {
    return IMPOSSIBLE;
  }

  const result = [];

  while (queue.length) {
    const idx = queue.shift();
    result.push(idx);

    const item = nodes[idx];

    let checked = false;
    for (const next of item.to) {
      nodes[next].count -= 1;
      if (nodes[next].count === 0) {
        if (checked) {
          return IMPOSSIBLE;
        }
        checked = true;
        queue.push(next);
      }
    }
  }

  if (result.length !== n) {
    return IMPOSSIBLE;
  }

  return result.join(" ");
}

function solution(t, cases) {
  let result = "";
  for (const [n, nums, m, rows] of cases) {
    result += `${getAnswer(n, nums, m, rows)}\n`;
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

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const n = +lines[idx++];
    const nums = lines[idx++].split(" ").map((it) => +it);
    const m = +lines[idx++];
    const rows = lines.slice(idx, idx + m).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += m;
    cases.push([n, nums, m, rows]);
  }

  solution(t, cases);
}
