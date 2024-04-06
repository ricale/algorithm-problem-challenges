function getPi(str) {
  for (let i = Math.floor(str.length / 2); i > 0; i--) {
    if (str.slice(0, i) === str.slice(str.length - i)) {
      return i;
    }
  }
  return 0;
}

function solution(target, part) {
  const pi = [0];
  for (let i = 1; i < part.length; i++) {
    pi[i] = getPi(part.slice(0, i + 1));
  }

  const result = [];
  let t = 0;
  let p = 0;
  while (t < target.length) {
    if (p === part.length) {
      result.push(t - part.length + 1);
      p = pi[p - 1];
    } else if (target[t] === part[p]) {
      p += 1;
      t += 1;
    } else if (p === 0) {
      t += 1;
    } else {
      p = pi[p - 1];
    }
  }

  console.log(`${result.length}\n${result.join(" ")}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

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
