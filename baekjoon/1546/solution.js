function solution(N, ...scores) {
  const max = scores.reduce((acc, it) => (acc > +it ? acc : +it), 0);

  console.log(scores.reduce((acc, it) => acc + (+it / max) * 100, 0) / N);
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
