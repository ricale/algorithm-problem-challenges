function getXor(nums) {
  return nums.length === 1 ? nums[0] : nums.reduce((acc, item) => acc ^ item);
}

function getSum(nums) {
  return nums.reduce((acc, item) => acc + item);
}

function getAnswer(nums) {
  const queue = [[[], [...new Array(nums.length)].map((_, i) => i)]];
  let result = 0;
  while (queue.length > 0) {
    const [curr, cands] = queue.shift();

    for (let i = 0; i < cands.length; i++) {
      const next = [...curr, cands[i]];

      const pat = nums.filter((_, i) => next.includes(i));
      const sean = nums.filter((_, i) => !next.includes(i));
      if (getXor(pat) === getXor(sean)) {
        result = Math.max(result, getSum(pat), getSum(sean));
      }

      if (pat.length + 1 <= sean.length - 1) {
        queue.push([next, cands.slice(i + 1)]);
      }
    }
  }
  return result;
}

function solution(t, cases) {
  let result = "";
  for (let i = 0; i < t; i++) {
    const [c, ...nums] = cases[i];
    nums.sort((a, b) => a - b);
    const answer = nums.length === 1 ? 0 : getAnswer(nums);
    result += `Case #${i + 1}: ${answer === 0 ? "NO" : answer}\n`;
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

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const c = +lines[idx++];
    const nums = lines[idx++].split(" ").map((it) => +it);
    cases.push([c, ...nums]);
  }

  solution(t, cases);
}
