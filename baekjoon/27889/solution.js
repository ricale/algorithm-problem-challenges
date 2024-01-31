function solution(input) {
  const names = {
    NLCS: "North London Collegiate School",
    BHA: "Branksome Hall Asia",
    KIS: "Korea International School",
    SJA: "St. Johnsbury Academy",
  };
  console.log(names[input]);
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
    solution(item);
  });
} else {
  solution(input);
}
