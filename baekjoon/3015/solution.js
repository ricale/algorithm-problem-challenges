function solution(n, nums) {
  let result = 0;
  let stack = [{ idx: 0, cnt: 1 }];
  for (let i = 1; i < n; i++) {
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (nums[top.idx] < nums[i]) {
        stack.pop();
        result += top.cnt;
      } else {
        break;
      }
    }
    const top = stack[stack.length - 1];
    if (nums[top?.idx ?? -1] === nums[i]) {
      result += top.cnt;
      top.cnt += 1;
    } else {
      stack.push({ idx: i, cnt: 1 });
    }
  }

  stack = [{ idx: n - 1, cnt: 1 }];
  for (let i = n - 2; i >= 0; i--) {
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (nums[top.idx] < nums[i]) {
        stack.pop();
        result += top.cnt;
      } else {
        break;
      }
    }
    const top = stack[stack.length - 1];
    if (nums[top?.idx ?? -1] === nums[i]) {
      top.cnt += 1;
    } else {
      stack.push({ idx: i, cnt: 1 });
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
