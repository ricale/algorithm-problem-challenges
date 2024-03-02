const days = [undefined, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function solution(x, y) {
  let dayCount = y;
  for (let i = 1; i < x; i++) {
    dayCount += days[i];
  }
  console.log(weekdays[dayCount % 7]);
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
