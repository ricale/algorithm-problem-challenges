function getAnswer(nums, s, e) {
  let l = s - 1;
  let r = e - 1;

  while (l < r) {
    if (nums[l] !== nums[r]) {
      return false;
    }
    l++;
    r--;
  }

  return true;
}

// cache result
function solution(n, nums, m, rows) {
  const checked = new Map();

  let result = "";
  for (const [s, e] of rows) {
    const key = `${(s + e) / 2}`;
    const item = checked.get(key);

    if (!item) {
      const answer = getAnswer(nums, s, e);
      checked.set(key, answer ? [e, null] : [null, e]);
      result += `${answer ? 1 : 0}\n`;
    } else if (item[0] !== null && item[0] > e) {
      result += "1\n";
    } else if (item[1] !== null && item[1] <= e) {
      result += "0\n";
    } else {
      const answer = getAnswer(nums, s, e);
      if (answer) {
        item[0] = e;
      } else {
        item[1] = e;
      }
      checked.set(key, [...item]);
      result += `${answer ? 1 : 0}\n`;
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
  const n = +cases[idx++];
  const nums = cases[idx++].split(" ").map((it) => +it);
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, nums, m, rows);
}
