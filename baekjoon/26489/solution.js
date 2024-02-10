function solution(rows) {
  console.log(rows.length);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const rows = input.split("\n").filter((item) => !!item);
solution(rows);
