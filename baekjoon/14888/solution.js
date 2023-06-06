function solution([n], nums, ops) {
  let min = 1000000000;
  let max = -1000000000;

  function calc(result, idx = 1) {
    if (idx === nums.length) {
      min = Math.min(result, min);
      max = Math.max(result, max);
      return;
    }

    const n = nums[idx];

    for (let i = 0; i < 4; i++) {
      if (ops[i] > 0) {
        ops[i] -= 1;
        calc(
          i === 0
            ? result + n
            : i === 1
            ? result - n
            : i === 2
            ? result * n
            : Math.floor(Math.abs(result) / n) * (result > 0 ? 1 : -1),
          idx + 1
        );
        ops[i] += 1;
      }
    }
  }

  calc(nums[0]);

  console.log(`${max}\n${min}`);
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
  const LINE_COUNT = 3;
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
