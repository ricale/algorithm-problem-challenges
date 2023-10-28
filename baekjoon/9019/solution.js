function find(source, target) {
  const queue = [source];
  let qidx = 0;
  const checked = new Array(10000).fill(null);
  checked[source] = "";

  while (queue.length > qidx) {
    const popped = queue[qidx++];
    const str = `${"0".repeat(4 - `${popped}`.length)}${popped}`;

    const cands = [
      ["D", (popped * 2) % 10000],
      ["S", popped === 0 ? 9999 : popped - 1],
      ["L", +`${str.slice(1)}${str[0]}`],
      ["R", +`${str[str.length - 1]}${str.slice(0, -1)}`],
    ];

    for (const [comm, cand] of cands) {
      if (checked[cand] !== null) {
        continue;
      }
      checked[cand] = `${checked[popped]}${comm}`;
      if (cand === target) {
        return checked[cand];
      }
      queue.push(cand);
    }
  }
}

function solution(n, rows) {
  let result = "";
  for (const [source, target] of rows) {
    result += `${find(source, target)}\n`;
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
