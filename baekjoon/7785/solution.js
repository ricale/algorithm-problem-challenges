function solution(n, rows) {
  const checked = new Set();

  for (const [name, action] of rows) {
    if (action === "enter") {
      checked.add(name);
    } else {
      checked.delete(name);
    }
  }

  const result = [...checked.values()].sort().reverse();

  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    const splitted = it.trim().split(" ");
    return splitted.length === 1 ? splitted[0] : splitted;
  });
  solution(n, rows);

  idx += n + offset;
}
