function solution(rows) {
  let result = "";
  for (const [lt, wt, le, we] of rows) {
    const ta = BigInt(lt) * BigInt(wt);
    const ea = BigInt(le) * BigInt(we);
    result += `${ta > ea ? "TelecomParisTech" : ta < ea ? "Eurecom" : "Tie"}\n`;
  }
  console.log(result);
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
  const rows = input
    .filter((item) => !!item)
    .slice(1)
    .reduce((acc, item, i) => {
      const splitted = item
        .trim()
        .split(" ")
        .map((it) => +it);
      acc.push(splitted);
      return acc;
    }, []);

  solution(rows);
  process.exit();
});
