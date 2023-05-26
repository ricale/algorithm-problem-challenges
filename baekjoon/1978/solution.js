function solution(_, nums) {
  let result = 0;
  for (let num of nums) {
    const n = +num;
    if (n === 1) continue;
    if (n === 2) {
      result += 1;
      continue;
    }
    if (n % 2 === 0) continue;

    let ok = true;
    for (let i = 3; i < n / 2; i++) {
      if (n % i === 0) {
        ok = false;
        break;
      }
    }

    if (ok) {
      result += 1;
    }
  }

  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const LINE_COUNT = 2;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const splitted = it.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted.length === 1 ? splitted[0] : splitted);

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input.split("\n").map((it) => {
      const splitted = it.trim().split(" ");
      return splitted.length === 1 ? splitted[0] : splitted;
    })
  );
}
