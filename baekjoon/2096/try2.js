const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("./input.txt"),
  // output: process.stdout,
});

let n = undefined;
let max;
let min;

rl.on("line", function (line) {
  if (n === undefined) {
    n = +line;
    return;
  }
  if (n === 0) {
    return;
  }
  const current = line.split(" ").map((it) => +it);
  n -= 1;
  if (!max) {
    max = [...current];
    min = [...current];
  } else {
    max = [
      max[0] + Math.max(current[0], current[1]),
      max[1] + Math.max(...current),
      max[2] + Math.max(current[1], current[2]),
    ];
    min = [
      min[0] + Math.min(current[0], current[1]),
      min[1] + Math.min(...current),
      min[2] + Math.min(current[1], current[2]),
    ];
  }
  if (n === 0) {
    console.log(`${Math.max(...max)} ${Math.min(...min)}`);
    return;
  }
}).on("close", function () {
  process.exit();
});
