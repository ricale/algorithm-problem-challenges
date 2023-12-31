function solution(word1, word2) {
  const results = [...new Array(word1.length + 1)].map(() =>
    new Array(word2.length + 1).fill(0)
  );

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        results[i][j] = results[i - 1][j - 1] + 1;
      } else {
        results[i][j] = Math.max(results[i - 1][j], results[i][j - 1]);
      }
    }
  }

  const length = results[word1.length][word2.length];
  if (length === 0) {
    console.log(length);
    return;
  }

  let i2 = word1.length;
  let j2 = word2.length;
  const answer = [];
  while (i2 > 0 && j2 > 0 && results[i2][j2] > 0) {
    const current = results[i2][j2];
    const above = results[i2 - 1][j2];
    const left = results[i2][j2 - 1];
    const diagonal = results[i2 - 1][j2 - 1];
    if (above === left && current > diagonal) {
      answer[current - 1] = word1[i2 - 1];
      i2 -= 1;
      j2 -= 1;
    } else if (above > left) {
      i2 -= 1;
    } else {
      j2 -= 1;
    }
  }

  console.log(`${length}\n${answer.join("")}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item.trim();
};

if (isLocal) {
  const LINE_COUNT = 2;
  const cases = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item));

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
