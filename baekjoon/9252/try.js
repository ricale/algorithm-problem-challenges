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

  let i2 = 0;
  let answer = [];
  for (let i1 = 1; i1 < results.length && i2 < word2.length; i1++) {
    const last = results[i1].length - 1;
    if (results[i1 - 1][last] < results[i1][last]) {
      while (i2 < word2.length) {
        if (word2[i2++] === word1[i1 - 1]) {
          answer.push(word1[i1 - 1]);
          break;
        }
      }
    }
  }

  if (answer.length === length) {
    console.log(`${length}\n${answer.join("")}`);
    return;
  }

  let j1 = 0;
  answer = [];
  for (let j2 = 1; j2 < results[0].length && j1 < word1.length; j2++) {
    const last = results.length - 1;
    if (results[last][j2 - 1] < results[last][j2]) {
      while (j1 < word1.length) {
        if (word1[j1++] === word2[j2 - 1]) {
          answer.push(word2[j2 - 1]);
          break;
        }
      }
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
