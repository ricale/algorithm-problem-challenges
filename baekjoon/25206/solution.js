function solution(...scores) {
  const scoresByGrade = {
    "A+": 4.5,
    A0: 4.0,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0.0,
  };

  let totalCredit = 0;
  let totalScore = 0;
  for (let [_, credit, grade] of scores) {
    if (grade !== "P") {
      totalCredit += +credit;
      totalScore += scoresByGrade[grade] * +credit;
    }
  }

  console.log(totalScore / totalCredit);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const LINE_COUNT = 20;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const splitted = it.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted);

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.split("\n").map((it) => it.trim().split(" ")));
}
