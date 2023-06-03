function solution(n, m, rows) {
  const dic = new Map();
  for (let word of rows) {
    if (word.length >= m) {
      dic.set(word, (dic.get(word) ?? 0) + 1);
    }
  }

  const sorted = [...dic.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
      if (a[0].length > b[0].length) return -1;
      if (a[0].length < b[0].length) return 1;
      return a[0].localeCompare(b[0]);
    })
    .map((it) => it[0]);

  console.log(sorted.join("\n"));
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it;
  });
  solution(n, m, rows);

  idx += n + offset;
}
