function getCantor(str) {
  const len = str.length;

  if (len === 1) {
    return str;
  }

  return (
    getCantor(str.slice(0, len / 3)) +
    " ".repeat(len / 3) +
    getCantor(str.slice((len / 3) * 2))
  );
}

function solution(rows) {
  let result = "";
  for (let n of rows) {
    const str = "-".repeat(Math.pow(3, n));
    const cantored = getCantor(str);
    result += `${cantored}\n`;
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

const cases = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => {
    return +item;
  });
solution(cases);
