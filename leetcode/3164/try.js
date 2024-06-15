/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  const answers = new Map();

  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  let result = 0;
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] % k !== 0) {
      continue;
    }
    const prevAnswer = answers.get(nums1[i]);
    if (prevAnswer !== undefined) {
      result += prevAnswer;
      continue;
    }
    let currentAnswer = 0;
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] < nums2[j] * k) {
        break;
      }
      if (nums1[i] % (nums2[j] * k) === 0) {
        currentAnswer += 1;
      }
    }
    result += currentAnswer;
    answers.set(nums1[i], currentAnswer);
  }

  return result;
};
