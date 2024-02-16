function solution([x1, y1, x2, y2], [x3, y3, x4, y4]) {
  const l1 = [x2 - x1, y2 - y1];
  const l13 = [x3 - x1, y3 - y1];
  const l14 = [x4 - x1, y4 - y1];

  const ccw11 = l1[0] * l13[1] - l1[1] * l13[0];
  const ccw12 = l1[0] * l14[1] - l1[1] * l14[0];

  if ((ccw11 < 0 && ccw12 < 0) || (ccw11 > 0 && ccw12 > 0)) {
    console.log(0);
    return;
  }

  const l2 = [x4 - x3, y4 - y3];
  const l21 = [x1 - x3, y1 - y3];
  const l22 = [x2 - x3, y2 - y3];

  const ccw21 = l2[0] * l21[1] - l2[1] * l21[0];
  const ccw22 = l2[0] * l22[1] - l2[1] * l22[0];

  if ((ccw21 < 0 && ccw22 < 0) || (ccw21 > 0 && ccw22 > 0)) {
    console.log(0);
    return;
  }

  console.log(1);
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
  const LINE_COUNT = 2;
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
