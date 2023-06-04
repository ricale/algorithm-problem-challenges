function solution(n) {
  const nums = [0, 1];

  if (n <= 1) {
    console.log(nums[n]);
    return;
  }

  for (let i = 2; i <= n; i++) {
    const sum = nums[0] + nums[1];
    nums[0] = nums[1];
    nums[1] = sum;
  }

  console.log(nums[1]);
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
    .filter((item) => !!item)
    .map((item) => +item);

  cases.forEach((item) => {
    solution(item);
  });
} else {
  solution(+input);
}
