const S = " ";

function recur(n) {
  if (n === 1) {
    return ["*"];
  }
  if (n === 2) {
    return ["*****", " ***", "  *"];
  }

  const last = recur(n - 1);
  if (n % 2 === 0) {
    last.reverse();
  }

  const bottomLength = last[0].length * 2 + 3;

  const bottom = "*".repeat(bottomLength);

  const middles = last.map((line, idx) => {
    const leftSpace = S.repeat(last.length - idx);
    const leftGap = S.repeat(idx);
    const rightGap = S.repeat(idx * 2);
    return `${leftSpace}*${leftGap}${line}${rightGap}*`;
  });

  const head = [...new Array(last.length)].map((_, idx) => {
    const leftSpace = S.repeat((bottomLength - 1) / 2 - idx);
    const rightPart = idx === 0 ? "" : `${S.repeat(idx * 2 - 1)}*`;
    return `${leftSpace}*${rightPart}`;
  });

  const result = [...head, ...middles, bottom];
  if (n % 2 === 0) {
    result.reverse();
  }

  return result;
}

function solution(n) {
  console.log(recur(n).join("\n"));
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
    solution(+item);
  });
} else {
  solution(+input);
}
