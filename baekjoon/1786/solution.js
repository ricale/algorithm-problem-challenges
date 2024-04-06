function getPi(str) {
  const pi = new Array(str.length).fill(0);
  let j = 0;
  for (let i = 1; i < str.length; i++) {
    while (j > 0 && str[i] !== str[j]) {
      j = pi[j - 1];
    }
    if (str[j] === str[i]) {
      pi[i] = ++j;
    }
  }
  return pi;
}

function solution(target, part) {
  const pi = getPi(part);

  const result = [];
  let j = 0;
  for (let i = 0; i < target.length; i++) {
    while (j > 0 && target[i] !== part[j]) {
      j = pi[j - 1];
    }
    if (target[i] === part[j]) {
      if (j === part.length - 1) {
        result.push(i - j + 1);
        j = pi[j];
      } else {
        j += 1;
      }
    }
  }

  console.log(
    result.length === 0 ? 0 : `${result.length}\n${result.join(" ")}`
  );
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

const mapper = (item) => {
  return item;
};

if (isLocal) {
  const LINE_COUNT = 2;
  const rows = input
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

  rows.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
