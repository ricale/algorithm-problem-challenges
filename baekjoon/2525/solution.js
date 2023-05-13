function solution(a, b, c) {
  const minutes = +b + +c;

  console.log((+a + Math.floor(minutes / 60)) % 24, minutes % 60);
}

//////
////
// input

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const cases = input
  .split("\n")
  .filter((it) => !!it)
  .reduce((acc, it, i) => {
    const splitted = it.trim().split(" ");
    const index = Math.floor(i / 2);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(...splitted);

    return acc;
  }, []);

cases.forEach((it) => {
  solution(...it);
});
