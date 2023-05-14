function solution(N, ...args) {
  const v = args[args.length - 1];
  const nums = args.slice(0, args.length - 1);
  console.log(nums.filter((it) => +it === +v).length);
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
      const index = Math.floor(i / 3);
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
