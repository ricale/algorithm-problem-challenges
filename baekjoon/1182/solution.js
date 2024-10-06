function solution([n, s], nums) {
  let result = 0;

  const getAnswer = (sum, cands) => {
    if (cands.length === 0) {
      return;
    }

    for (let i = 0; i < cands.length; i++) {
      if (sum + cands[i] === s) {
        result += 1;
      }
      getAnswer(sum + cands[i], cands.slice(i + 1));
    }
  };

  getAnswer(0, [...nums]);

  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
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
