const TABLE = {
  black: [0, ""],
  brown: [1, "0"],
  red: [2, "00"],
  orange: [3, "000"],
  yellow: [4, "0000"],
  green: [5, "00000"],
  blue: [6, "000000"],
  violet: [7, "0000000"],
  grey: [8, "00000000"],
  white: [9, "000000000"],
};

function solution(c1, c2, c3) {
  let result = `${TABLE[c1][0]}${TABLE[c2][0]}${TABLE[c3][1]}`;
  while (result[0] === "0") {
    result = result.slice(1);
  }
  console.log(result || 0);
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
  const LINE_COUNT = 3;
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
