function fib(num) {
  let fibCount = 0;
  function fibImpl(n) {
    if (n === 1 || n === 2) {
      fibCount += 1;
      return 1;
    }
    return fibImpl(n - 1) + fibImpl(n - 2);
  }
  fibImpl(num);
  return fibCount;
}

function fibonacci(num) {
  let fibonacciCount = 0;
  function fibonacciImpl(n) {
    const f = [0, 1, 1];
    for (let i = 3; i <= n; i++) {
      fibonacciCount += 1;
      f[i] = f[i - 1] + f[i - 2];
    }
    return f[n];
  }

  fibonacciImpl(num);
  return fibonacciCount;
}

function solution(n) {
  console.log(`${fib(n)} ${fibonacci(n)}`);
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
