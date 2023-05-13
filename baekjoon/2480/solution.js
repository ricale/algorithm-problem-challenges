function solution(...args) {
  const n1 = +args[0];
  const n2 = +args[1];
  const n3 = +args[2];

  if (n1 === n2 && n2 === n3) {
    console.log(10000 + n1 * 1000);
    return;
  }

  if (n1 !== n2 && n2 !== n3 && n3 !== n1) {
    console.log(Math.max(n1, n2, n3) * 100);
    return;
  }

  if (n1 === n2) {
    console.log(1000 + n1 * 100);
    return;
  }

  if (n2 === n3) {
    console.log(1000 + n2 * 100);
    return;
  }

  console.log(1000 + n3 * 100);
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
  .map((it) => it.trim().split(" "));

cases.forEach((it) => {
  solution(...it);
});
