function getSequences(nums, m) {
  if (m === 1) {
    return nums;
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const rest = [...nums];
    const n = rest.splice(i, 1)[0];
    const subSequences = getSequences(rest, m - 1);
    for (let j = 0; j < subSequences.length; j++) {
      result.push(`${n} ${subSequences[j]}`);
    }
  }
  return result;
}

function solution(n, m) {
  const nums = [...new Array(n)].map((_, i) => i + 1);
  const result = getSequences(nums, m);
  console.log(result.join("\n"));
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
