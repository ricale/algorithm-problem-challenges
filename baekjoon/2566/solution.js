function solution(rows) {
  let max = -1;
  let maxX, maxY;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (max < +rows[i][j]) {
        max = rows[i][j];
        maxX = j;
        maxY = i;
      }
    }
  }

  console.log(max);
  console.log(`${maxY + 1} ${maxX + 1}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const LINE_COUNT = 9;
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
    solution(it);
  });
} else {
  solution(
    input.split("\n").map((it) => {
      const splitted = it.trim().split(" ");
      return splitted.length === 1 ? splitted[0] : splitted;
    })
  );
}
