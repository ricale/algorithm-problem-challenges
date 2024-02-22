function solution(stats) {
  const isValid = (indices) => {
    for (let i = 0; i < 8; i++) {
      const l = indices[i === 0 ? 7 : i - 1];
      const c = indices[i];
      const r = indices[i === 7 ? 0 : i + 1];

      const v1 = [0, stats[l]];
      const v2 = [
        stats[c] * Math.cos(Math.PI / 4),
        stats[c] * Math.sin(Math.PI / 4),
      ];
      const v3 = [stats[r], 0];

      if (v2[1] < -(v1[1] / v3[0]) * v2[0] + v1[1]) {
        return false;
      }
    }
    return true;
  };

  let result = 0;

  const travel = (nums, current) => {
    if (nums.length === 0) {
      if (isValid(current)) {
        result += 1;
      }
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      current.push(nums[i]);
      travel([...nums.slice(0, i), ...nums.slice(i + 1)], current);
      current.pop();
    }
  };

  travel([0, 1, 2, 3, 4, 5, 6, 7], []);

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
    solution(
      item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
