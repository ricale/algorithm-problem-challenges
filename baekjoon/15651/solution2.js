function getSequences(n, m, result, line = []) {
  if (m === 0) {
    result.push(line.join(" "));
    return;
  }
  for (let i = 1; i <= n; i++) {
    line.push(i);
    getSequences(n, m - 1, result, line);
    line.pop(i);
  }
}

function solution(n, m) {
  const result = [];
  getSequences(n, m, result);
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
