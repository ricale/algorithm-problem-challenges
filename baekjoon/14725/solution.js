function print(node, level = 0) {
  const keys = [...node.keys()];
  keys.sort();

  let result = "";
  for (const key of keys) {
    result += `${"-".repeat(level * 2)}${key}\n`;
    result += `${print(node.get(key), level + 1)}`;
  }
  return result;
}

function solution(n, rows) {
  const root = new Map();

  for (const [t, ...foods] of rows) {
    let current = root;
    for (let i = 0; i < foods.length; i++) {
      let next;
      if (current.has(foods[i])) {
        next = current.get(foods[i]);
      } else {
        next = new Map();
        current.set(foods[i], next);
      }
      current = next;
    }
  }

  console.log(print(root));
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it, idx) => (idx === 0 ? +it : it));
  });
  idx += n;

  solution(n, rows);
}
