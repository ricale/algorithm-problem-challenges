function solution(index) {
  const scoreMap = [
    [12, 1600],
    [11, 894],
    [11, 1327],
    [10, 1311],
    [9, 1004],
    [9, 1178],
    [9, 1357],
    [8, 837],
    [7, 1055],
    [6, 556],
    [6, 773],
  ];
  const score = scoreMap[index - 1];
  console.log(`${score[0]} ${score[1]}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(+item);
  });
} else {
  solution(+input);
}
