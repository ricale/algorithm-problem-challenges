function solution(...inputs) {
  let result = "";
  for (const item of inputs) {
    const [h1, m1, s1, h2, m2, s2] = item;

    const seconds1 = h1 * 60 * 60 + m1 * 60 + s1;
    const seconds2 = h2 * 60 * 60 + m2 * 60 + s2;
    const diff = seconds2 - seconds1;
    result +=
      `${Math.floor(diff / 60 / 60)}` +
      ` ${Math.floor(diff / 60) % 60}` +
      ` ${diff % 60}\n`;
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

const mapper = (item) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 3;
  const rows = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item));

      return acc;
    }, []);

  rows.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
