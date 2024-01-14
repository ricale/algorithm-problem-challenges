// 8 4 2 5 1 6 3 7
// 8 4 5 2 6 7 3 1
// 1 2 4 8 5 3 6 7

// 0 1 2  3  4 5  6  7  8 9 10 11 12 13 14
// ---------------------------------------
// 8 4 9  2 10 5 11  1 12 6 13  3 14  7 15
// 8 9 4 10 11 5  2 12 13 6 14 15  7  3  1
// 1 2 4  8  9 5 10 11  3 6 12 13  7 14 15

function solution([n], inorder, postorder) {
  const result = [];

  const transform = (i1, i2, p1, p2) => {
    if (i1 > i2) {
      return "";
    }

    if (i1 === i2) {
      result.push(inorder[i1]);
      return;
    }

    const root = postorder[p2];
    result.push(root);
    const inorderRoot = inorder.indexOf(root);

    transform(i1, inorderRoot - 1, p1, p1 + (inorderRoot - 1 - i1));
    transform(inorderRoot + 1, i2, inorderRoot, p2 - 1);
  };

  transform(0, n - 1, 0, n - 1);

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
