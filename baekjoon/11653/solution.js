function solution(input) {
  if (input === "1") {
    return;
  }

  let n = +input;
  const result = [];

  let divider = 2;
  while (n !== 1) {
    if (n % divider === 0) {
      result.push(divider);
      n = n / divider;
    } else {
      divider += 1;
    }
  }

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
