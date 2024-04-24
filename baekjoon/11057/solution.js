const MOD = 10007;

function solution(n) {
  let result = new Array(10).fill(1);
  for (let i = 1; i < n; i++) {
    const last = [...result];
    result = new Array(10).fill(0);
    for (let j = 0; j < 10; j++) {
      for (let k = j; k < 10; k++) {
        result[j] = (result[j] + last[k]) % MOD;
      }
    }
  }

  console.log(result.reduce((acc, item) => (acc + item) % MOD, 0));
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
