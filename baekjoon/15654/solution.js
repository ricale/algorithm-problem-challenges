function solution([n, m], nums) {
  nums.sort((a, b) => a - b);

  const reuslt = [];

  const solve = (cands, answer = []) => {
    if (answer.length === m) {
      reuslt.push(answer.join(" "));
      return;
    }
    for (let i = 0; i < cands.length; i++) {
      solve(
        [...cands.slice(0, i), ...cands.slice(i + 1)],
        [...answer, cands[i]]
      );
    }
  };

  solve(nums);

  console.log(reuslt.join("\n"));
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
