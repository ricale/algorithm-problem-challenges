let count = 0;

function nqueen(n, y = 0, queens = []) {
  if (n === y) {
    count += 1;
    return;
  }
  for (let x = 0; x < n; x++) {
    const found = queens.find(
      (item) =>
        item[0] === x ||
        item[0] - x === item[1] - y ||
        item[0] - x === y - item[1]
    );

    if (!found) {
      queens.push([x, y]);
      nqueen(n, y + 1, queens);
      queens.pop();
    }
  }
}

function solution(n) {
  nqueen(n);
  console.log(count);
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
