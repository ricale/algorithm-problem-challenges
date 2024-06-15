/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);

  let result = meetings[0][0] - 1;

  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i][0] <= meetings[i - 1][1]) {
      if (meetings[i][1] <= meetings[i - 1][1]) {
        meetings[i][1] = meetings[i - 1][1];
      }
    } else {
      result += meetings[i][0] - meetings[i - 1][1] - 1;
    }
  }

  result += days - meetings[meetings.length - 1][1];

  return result;
};
