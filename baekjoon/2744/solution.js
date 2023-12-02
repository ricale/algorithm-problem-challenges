function solution(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result +=
      "a" <= str[i] && str[i] <= "z"
        ? str[i].toUpperCase()
        : str[i].toLowerCase();
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
    solution(item.trim());
  });
} else {
  solution(input.trim());
}
