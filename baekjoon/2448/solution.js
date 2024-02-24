function getTriangle() {
  return [`  *  `, ` * * `, `*****`];
}

function recur(n) {
  if (n === 6) {
    const min = getTriangle();
    return [
      `   ${min[0]}   `,
      `   ${min[1]}   `,
      `   ${min[2]}   `,
      `${min[0]} ${min[0]}`,
      `${min[1]} ${min[1]}`,
      `${min[2]} ${min[2]}`,
    ];
  }

  const triangle = recur(n / 2);

  return [
    ...triangle.map(
      (item) => `${" ".repeat(n / 2)}${item}${" ".repeat(n / 2)}`
    ),
    ...triangle.map((item, idx) => `${item} ${item}`),
  ];
}

function solution(n) {
  if (n === 3) {
    console.log(getTriangle().join("\n"));
    return;
  }
  console.log(recur(n).join("\n"));
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
