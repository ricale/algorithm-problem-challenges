function solution(n, m, s) {
  const chars = s.split("");

  let continued = chars[0] === "I" ? 1 : 0;
  const subset = [];
  const saveIfNeeded = () => {
    if (continued >= 3) {
      const subn = ((continued % 2 === 0 ? continued - 1 : continued) - 1) / 2;
      if (subn >= n) {
        subset.push(subn);
      }
    }
  };

  for (let i = 1; i < s.length; i++) {
    const current = chars[i];
    const last = chars[i - 1];
    if (current === "I") {
      if (last === "I") {
        saveIfNeeded();
        continued = 1;
      } else {
        if (continued > 0) {
          continued += 1;
        } else {
          saveIfNeeded();
          continued = 1;
        }
      }
    } else {
      if (last === "I") {
        continued += 1;
      } else {
        saveIfNeeded();
        continued = 0;
      }
    }
  }
  saveIfNeeded();
  console.log(subset.reduce((acc, item) => acc + (item - n + 1), 0));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item, index) => {
  if (index < 2) {
    return +item.trim();
  }
  return item.trim();
};

if (isLocal) {
  const LINE_COUNT = 3;
  const cases = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item, i % LINE_COUNT));

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
