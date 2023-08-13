function solution(n, m, sitesAndPasswords, cands) {
  const passwordBySite = new Map();
  for (const [site, password] of sitesAndPasswords) {
    passwordBySite.set(site, password);
  }

  let result = "";
  for (const cand of cands) {
    result += `${passwordBySite.get(cand)}\n`;
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item.trim().split(" ");
  });
  const rows2 = cases
    .slice(idx + n + offset, idx + n + m + offset)
    .map((item) => {
      return item;
    });
  solution(n, m, rows, rows2);

  idx += n + m + offset;
}
