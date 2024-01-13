function solution(preorder) {
  let result = "";

  const travel = (begin, end) => {
    if (begin >= end) {
      return;
    }
    if (begin + 1 === end) {
      result += `${preorder[begin]}\n`;
      return;
    }

    const root = preorder[begin];

    let rightChild = begin + 1;
    for (; rightChild < end && preorder[rightChild] < root; rightChild++) {}

    travel(begin + 1, rightChild);
    travel(rightChild, end);

    result += `${root}\n`;
  };

  travel(0, preorder.length);

  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const rows = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => +item);
solution(rows);
