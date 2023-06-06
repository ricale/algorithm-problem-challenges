function getSequences(idx, n, m, result, output = []) {
  if (idx === m) {
    result.push(output.join(" "));
    return;
  }

  const first = idx === 0 ? 1 : output[idx - 1];
  for (let i = first; i <= n; i++) {
    output[idx] = i;
    getSequences(idx + 1, n, m, result, output);
  }
}

function solution(n, m) {
  const result = [];
  getSequences(0, n, m, result);
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
