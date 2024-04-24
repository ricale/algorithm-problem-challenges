function solution(n) {
  if (n === "0") {
    console.log("0");
    return;
  }

  let result = "";
  for (let i = 0; i < n.length; i++) {
    result +=
      n[i] === "0"
        ? "000"
        : n[i] === "1"
        ? "001"
        : n[i] === "2"
        ? "010"
        : n[i] === "3"
        ? "011"
        : n[i] === "4"
        ? "100"
        : n[i] === "5"
        ? "101"
        : n[i] === "6"
        ? "110"
        : "111";
  }

  while (result[0] === "0") {
    result = result.slice(1);
  }

  console.log(result);
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
