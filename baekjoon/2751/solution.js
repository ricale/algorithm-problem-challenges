function solution(n, nums) {
  const result = [...nums];

  function merge(target, left, mid, right) {
    let l = left;
    let r = mid + 1;
    let i = left;
    while (l <= mid && r <= right) {
      if (target[l] < target[r]) {
        result[i] = target[l];
        i += 1;
        l += 1;
      } else {
        result[i] = target[r];
        i += 1;
        r += 1;
      }
    }

    while (l <= mid) {
      result[i] = target[l];
      i += 1;
      l += 1;
    }

    while (r <= right) {
      result[i] = target[r];
      i += 1;
      r += 1;
    }

    for (let j = left; j <= right; j++) {
      target[j] = result[j];
    }
  }

  function sort(target, left, right) {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    sort(target, left, mid);
    sort(target, mid + 1, right);
    merge(target, left, mid, right);
  }

  sort(nums, 0, nums.length - 1);

  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    const splitted = it.trim().split(" ");
    return splitted.length === 1 ? +splitted[0] : splitted;
  });
  solution(n, rows);

  idx += n + offset;
}
