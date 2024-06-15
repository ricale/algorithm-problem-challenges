/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  const cands = {};

  for (const num of nums1) {
    for (let i = 1; i * i <= num; i++) {
      if (i * i === num) {
        if (!cands[i]) {
          cands[i] = 0;
        }
        cands[i] += 1;
      } else if (num % i === 0) {
        if (!cands[i]) {
          cands[i] = 0;
        }
        cands[i] += 1;
        if (!cands[num / i]) {
          cands[num / i] = 0;
        }
        cands[num / i] += 1;
      }
    }
  }

  let result = 0;
  for (const num of nums2) {
    const divider = num * k;

    if (cands[divider]) {
      result += cands[divider];
    }
  }

  return result;
};
