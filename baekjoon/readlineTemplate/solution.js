function solution() {
  // code
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
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const splitted = item.trim().split(" ");
      const index = Math.floor(i / 2);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(...splitted);

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
  process.exit();
});
