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
  const stack = [[0, n - 1, 0, n - 1]];

  while (stack.length > 0) {
    const [i1, i2, p1, p2] = stack.pop();
    if (i1 > i2) {
      continue;
    }
    if (i1 === i2) {
      result.push(inorder[i1]);
      continue;
    }

    const root = postorder[p2];
    result.push(root);
    let inorderRoot;
    for (let i = i1; i <= i2; i++) {
      if (inorder[i] === root) {
        inorderRoot = i;
        break;
      }
    }

    const postorderEnd = p1 + (inorderRoot - 1 - i1);
    stack.push([inorderRoot + 1, i2, postorderEnd + 1, p2 - 1]);
    stack.push([i1, inorderRoot - 1, p1, postorderEnd]);
  }

  console.log(result.join(" "));
}

//////
////
// input

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input:
    process.platform === "linux"
      ? process.stdin
      : fs.createReadStream("./input.txt"),
  // output: process.stdout,
});

const input = [];
const LINE_COUNT = 3;

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  const cases = input
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const splitted = item.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted);

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
  process.exit();
});
