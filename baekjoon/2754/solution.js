function solution(grade) {
  console.log(
    grade === "A+"
      ? "4.3"
      : grade === "A0"
      ? "4.0"
      : grade === "A-"
      ? "3.7"
      : grade === "B+"
      ? "3.3"
      : grade === "B0"
      ? "3.0"
      : grade === "B-"
      ? "2.7"
      : grade === "C+"
      ? "2.3"
      : grade === "C0"
      ? "2.0"
      : grade === "C-"
      ? "1.7"
      : grade === "D+"
      ? "1.3"
      : grade === "D0"
      ? "1.0"
      : grade === "D-"
      ? "0.7"
      : "0.0"
  );
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
    solution(item.trim());
  });
} else {
  solution(input.trim());
}
