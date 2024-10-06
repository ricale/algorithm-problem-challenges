function solution(n, k) {
  const nums = [...new Array(n)].map((_, i) => i + 1);
  const result = [];

  let i = 0;
  while (nums.length > 0) {
    i = (i + (k - 1)) % nums.length;
    result.push(nums.splice(i, 1)[0]);
  }

  console.log(`<${result.join(", ")}>`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
