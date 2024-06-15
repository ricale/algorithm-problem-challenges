/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  const dp = [...new Array(rewardValues.length)].map(() =>
    new Array(4000).fill(0)
  );
  rewardValues.sort((a, b) => a - b);

  var getAnswer = function (pos, sum) {
    if (pos >= rewardValues.length) {
      return sum;
    }

    if (dp[pos][sum]) {
      return dp[pos][sum];
    }

    const value = rewardValues[pos];

    const picked = value > sum ? getAnswer(pos + 1, value + sum) : 0;
    const notPicked = getAnswer(pos + 1, sum);

    return (dp[pos][sum] = Math.max(picked, notPicked));
  };

  return getAnswer(0, 0);
};
