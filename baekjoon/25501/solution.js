function isPalindrome(str, l = 0, r = str.length - 1, count = 1) {
  if (l >= r) return [1, count];
  if (str[l] !== str[r]) return [0, count];
  return isPalindrome(str, l + 1, r - 1, count + 1);
}

function solution(n, rows) {
  let result = "";
  for (let str of rows) {
    const res = isPalindrome(str);
    result += `${res.join(" ")}\n`;
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
    return item;
  });
  solution(n, rows);

  idx += n + offset;
}
