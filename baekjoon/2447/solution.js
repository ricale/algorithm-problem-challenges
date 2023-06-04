function getStars(n) {
  if (n === 3) {
    return "***\n* *\n***";
  }

  const starlines = getStars(n / 3).split("\n");

  const normal = starlines.map((it) => it.repeat(3)).join("\n");
  const withSpace = starlines
    .map((it) => `${it}${" ".repeat(it.length)}${it}`)
    .join("\n");

  return `${normal}\n${withSpace}\n${normal}`;
}

function solution(n) {
  console.log(getStars(n));
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
