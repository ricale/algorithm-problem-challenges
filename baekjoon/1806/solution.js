function solution([n, s], nums) {
  let l = 0;
  let r = 0;
  let sum = nums[0];
  let answer = Infinity;

  while (true) {
    if (sum < s) {
      if (r === n - 1) {
        break;
      }
      sum += nums[++r];
    } else {
      answer = Math.min(answer, r - l + 1);
      if (r === l) {
        break;
      } else {
        sum -= nums[l++];
      }
    }
  }

  console.log(answer === Infinity ? 0 : answer);
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
