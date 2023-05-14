function solution(N, ...nums) {
  let max = -1_000_000;
  let min = 1_000_000;

  for (let i = 0; i < N; i++) {
    const n = +nums[i];
    if (max < n) {
      max = n;
    }
    if (min > n) {
      min = n;
    }
  }

  console.log(min + " " + max);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
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
} else {
  solution(
    ...input
      .split("\n")
      .reduce((acc, it) => [...acc, ...it.trim().split(" ")], [])
  );
}
