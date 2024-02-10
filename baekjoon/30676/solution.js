function solution(value) {
  console.log(
    value < 425
      ? "Violet"
      : value < 450
      ? "Indigo"
      : value < 495
      ? "Blue"
      : value < 570
      ? "Green"
      : value < 590
      ? "Yellow"
      : value < 620
      ? "Orange"
      : "Red"
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
    solution(+item);
  });
} else {
  solution(+input);
}
