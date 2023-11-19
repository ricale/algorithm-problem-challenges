function solution(n) {
  const checked = [...new Array(n + 1)].fill(true);
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (!checked[i]) {
      continue;
    }
    primes.push(i);
    for (let j = i + i; j <= n; j += i) {
      checked[j] = false;
    }
  }

  let l = 0;
  let r = 0;
  let sum = 0;
  let count = 0;

  // console.log({ n });

  while (true) {
    if (sum < n) {
      if (r === primes.length) {
        break;
      }
      sum += primes[r++];
    } else if (sum >= n) {
      sum -= primes[l++];
    }

    if (sum === n) {
      count += 1;
      // console.log([...new Array(r - l)].map((_, i) => primes[i + l]));
    }
  }

  // console.log(">>>", primes[primes.length - 2], primes[primes.length - 1]);

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
