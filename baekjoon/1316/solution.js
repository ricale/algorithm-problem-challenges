function solution(n, rows) {
  const filtered = rows.filter(([str]) => {
    let current = str[0];
    let checked = new Set();
    checked.add(current);

    for (let i = 1; i < str.length; i++) {
      if (current !== str[i]) {
        if (checked.has(str[i])) {
          return false;
        }
        current = str[i];
        checked.add(current);
      }
    }
    return true;
  });

  console.log(filtered.length);
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
  const rows = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => it.trim().split(" "));
  solution(n, rows);

  idx += n + offset;
}
