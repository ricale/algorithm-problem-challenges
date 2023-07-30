const r = 31;
const M = 1234567891;

function solution(length, str) {
  let result = 0;

  let powered = 1;
  for (let i = 0; i < str.length; i++) {
    result += ((str.charCodeAt(i) - 96) * powered) % M;
    result = result % M;
    powered = (powered * r) % M;
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

const mapper = (item, i) => {
  return i % 2 === 0 ? +item : item;
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
      acc[index].push(mapper(item, i));

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
