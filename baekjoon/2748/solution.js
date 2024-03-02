function solution(n) {
  if (n <= 1) {
    console.log(n);
    return;
  }

  let a = BigInt(0);
  let b = BigInt(1);
  let c;

  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  console.log(`${c}`);
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
