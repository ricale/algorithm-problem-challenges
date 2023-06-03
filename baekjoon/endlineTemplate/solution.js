function solution(rows) {
  // code
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

const rows = cases.map((it) => {
  const splitted = it.trim().split(" ");
  return splitted.length === 1 ? splitted[0] : splitted;
});
solution(rows);
