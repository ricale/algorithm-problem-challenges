function solution(s, n, rows) {
  const subSumMap = new Map();

  function getSubSums(char) {
    const found = subSumMap.get(char);
    if (found) {
      return found;
    }

    const subSums = [s[0] === char ? 1 : 0];
    for (let k = 1; k < s.length; k++) {
      subSums[k] = subSums[k - 1] + (s[k] === char ? 1 : 0);
    }
    subSumMap.set(char, subSums);
    return subSums;
  }

  let result = "";
  for (let [char, i, j] of rows) {
    const subSums = getSubSums(char);
    result += `${subSums[j] - (subSums[i - 1] ?? 0)}\n`;
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
  const s = cases[idx];
  const n = +cases[idx + 1];
  const offset = 2;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    const splitted = item.trim().split(" ");
    return [splitted[0], +splitted[1], +splitted[2]];
  });
  solution(s, n, rows);

  idx += n + offset;
}
