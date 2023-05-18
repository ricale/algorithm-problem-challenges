function solution(N) {
  const n = +N;
  const rowCount = n * 2 - 1;
  const half = Math.floor(rowCount / 2);
  for (let i = 0; i < rowCount; i++) {
    console.log(
      " ".repeat(i < n ? half - i : i - half) +
        "*".repeat(i < n ? (i + 1) * 2 - 1 : (rowCount - i) * 2 - 1)
    );
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.trim().split(" "));
}
