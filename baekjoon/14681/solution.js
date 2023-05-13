function solution(x, y) {
  const nx = +x;
  const ny = +y;

  if (nx > 0) {
    if (ny > 0) {
      console.log(1);
      return;
    }
    console.log(4);
    return;
  }

  if (ny > 0) {
    console.log(2);
    return;
  }

  console.log(3);
  return;
}

//////
////
// input

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("./input.txt"),
  // output: process.stdout,
});

const input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  const cases = input
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
  process.exit();
});
