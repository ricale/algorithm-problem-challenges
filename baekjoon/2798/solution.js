function solution([N, M], cards) {
  const target = +M;
  const nums = cards.map((it) => +it);
  const len = nums.length;

  let result = 0;

  for (let i = 0; i < len - 2; i++) {
    if (nums[i] >= target) {
      continue;
    }
    for (let j = i + 1; j < len - 1; j++) {
      if (nums[i] + nums[j] >= target) {
        continue;
      }
      for (let k = j + 1; k < len; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (target === sum) {
          console.log(target);
          return;
        }
        if (target > sum && result < sum) {
          result = sum;
        }
      }
    }
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

if (isLocal) {
  const LINE_COUNT = 2;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const splitted = it.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted.length === 1 ? splitted[0] : splitted);

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input.split("\n").map((it) => {
      const splitted = it.trim().split(" ");
      return splitted.length === 1 ? splitted[0] : splitted;
    })
  );
}
