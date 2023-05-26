function solution(rows) {
  let result = "";
  for (let row of rows) {
    if (row === "-1") {
      console.log(result);
      return;
    }

    const n = +row;
    const ds = [1];
    for (let i = 2; i <= n / 2; i++) {
      if (n % i === 0) {
        ds.push(i);
      }
    }

    result +=
      ds.reduce((acc, it) => acc + it, 0) === n
        ? `${n} = ${ds.join(" + ")}`
        : `${n} is NOT perfect.`;
    result += "\n";
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

const rows = cases.map((it) => it.trim());
solution(rows);
