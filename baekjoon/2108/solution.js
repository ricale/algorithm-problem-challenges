function solution(n, rows) {
  const sorted = rows.sort((a, b) => a - b);

  let sum = 0;
  let freqs = new Map();
  let maxFreq = 0;
  for (const n of sorted) {
    sum += n;
    const count = (freqs.get(n) ?? 0) + 1;
    if (maxFreq < count) {
      maxFreq = count;
    }
    freqs.set(n, count);
  }

  let maxFreqNum;
  for (const [n, count] of freqs.entries()) {
    if (maxFreq === count) {
      if (maxFreqNum === undefined) {
        maxFreqNum = n;
      } else {
        maxFreqNum = n;
        break;
      }
    }
  }

  const avg = Math.round(sum / n);
  const mid = sorted[Math.floor(n / 2)];
  const range = sorted[sorted.length - 1] - sorted[0];

  console.log(`${avg}\n${mid}\n${maxFreqNum}\n${range}`);
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
    return +it;
  });
  solution(n, rows);

  idx += n + offset;
}
