function solution([n, k], nums) {
  let count = 0;
  function merge(arr, p, q, r) {
    let i = p;
    let j = q + 1;
    let tmp = [];
    let t = 0;
    while (i <= q && j <= r) {
      tmp[t++] = arr[i] < arr[j] ? arr[i++] : arr[j++];
      if (++count === k) return tmp[t - 1];
    }
    while (i <= q) {
      tmp[t++] = arr[i++];
      if (++count === k) return tmp[t - 1];
    }
    while (j <= r) {
      tmp[t++] = arr[j++];
      if (++count === k) return tmp[t - 1];
    }
    i = p;
    t = 0;
    while (i <= r) {
      arr[i++] = tmp[t++];
    }
  }

  function mergeSort(arr, p = 0, r = arr.length - 1) {
    if (p >= r) {
      return;
    }

    const q = Math.floor((p + r) / 2);
    const res1 = mergeSort(arr, p, q);
    if (res1 !== undefined) return res1;

    const res2 = mergeSort(arr, q + 1, r);
    if (res2 !== undefined) return res2;

    const res3 = merge(arr, p, q, r);
    if (res3 !== undefined) return res3;
  }

  const result = mergeSort(nums);
  console.log(result === undefined ? -1 : result);
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
  const cases = input
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

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
