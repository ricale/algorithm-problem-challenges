function solution(n) {
  const nums = [...new Array(n)].map((_, i) => i + 1);

  let first = 0;
  let i = 0;
  while (nums.length - 1 > first) {
    if (i % 2 === 0) {
      first += 1;
    } else {
      nums.push(nums[first]);
      first += 1;
    }
    i += 1;
  }

  console.log(nums[first]);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) => +it);

  cases.forEach((it) => {
    solution(it);
  });
} else {
  solution(+input);
}
