function solution([n, m], a, b) {
  let i = 0;
  let j = 0;

  const result = [];
  while (i < n && j < m) {
    if (a[i] <= b[j]) {
      result.push(a[i]);
      i += 1;
    } else {
      result.push(b[j]);
      j += 1;
    }
  }
  for (; i < n; i++) {
    result.push(a[i]);
  }
  for (; j < m; j++) {
    result.push(b[j]);
  }

  console.log(result.join(" "));
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
