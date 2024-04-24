function solution(n, rows) {
  let result = "";
  for (let i = 0; i < n * 2; i += 2) {
    const cardsA = rows[i].slice(1).sort((a, b) => b - a);
    const cardsB = rows[i + 1].slice(1).sort((a, b) => b - a);
    const maxlen = Math.max(cardsA.length, cardsB.length);

    let roundResult = "D";
    for (let j = 0; j < maxlen; j++) {
      if (!cardsA[j]) {
        roundResult = "B";
        break;
      }
      if (!cardsB[j]) {
        roundResult = "A";
        break;
      }
      if (cardsA[j] > cardsB[j]) {
        roundResult = "A";
        break;
      }
      if (cardsA[j] < cardsB[j]) {
        roundResult = "B";
        break;
      }
    }
    result += `${roundResult}\n`;
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
  const rows = cases.slice(idx, idx + n * 2).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n * 2;

  solution(n, rows);
}
