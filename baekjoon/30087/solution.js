function solution(n, rows) {
  const classroomMap = {
    Algorithm: "204",
    DataAnalysis: "207",
    ArtificialIntelligence: "302",
    CyberSecurity: "B101",
    Network: "303",
    Startup: "501",
    TestStrategy: "105",
  };
  console.log(rows.reduce((acc, item) => `${acc}${classroomMap[item]}\n`, ""));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item;
  });
  idx += n;

  solution(n, rows);
}
