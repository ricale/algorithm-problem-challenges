function solution(str) {
  let result = 0;
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1] && str[i] !== str[0]) {
      result += 1;
    }
  }
  console.log(result);
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
    solution(item);
  });
} else {
  solution(input);
}
