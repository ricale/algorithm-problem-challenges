function solution(n) {
  let curr = n;
  let cnt = 0;

  while (true) {
    const [a, b] = curr.length === 2 ? curr.split("") : ["0", curr];
    curr = `${b}${(+a + +b) % 10}`;
    cnt += 1;
    if (+curr === +n) {
      console.log(cnt);
      return;
    }
  }
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
