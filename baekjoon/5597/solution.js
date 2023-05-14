function solution(...nums) {
  const checked = new Array(30).fill(0);
  for (let num of nums) {
    checked[+num - 1] = 1;
  }
  console.log(
    checked.reduce((acc, it, i) => (it === 0 ? `${acc}${i + 1} ` : acc), "")
  );
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
      const index = Math.floor(i / 28);
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
