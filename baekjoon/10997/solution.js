function recur(n) {
  if (n === 1) {
    return ["*"];
  }

  if (n === 2) {
    return ["*****", "*", "* ***", "* * *", "* * *", "*   *", "*****"];
  }

  const last = recur(n - 1);

  const middles = last.map((line, i) =>
    i === 0
      ? `* ${line}**`
      : line.length === 1
      ? `* ${line}${" ".repeat((n - 2) * 4)} *`
      : `* ${line} *`
  );
  const edge = "*".repeat((n - 1) * 4 + 1);
  const underEdge = `*`;
  const upperEdge = `*${" ".repeat((n - 1) * 4 - 1)}*`;

  return [edge, underEdge, ...middles, upperEdge, edge];
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
