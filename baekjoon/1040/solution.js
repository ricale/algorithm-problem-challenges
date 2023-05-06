function solution(N, K) {
  const k = +K;

  // N 의 자릿수보다 k 가 크면 k를 만족하는 제일 작은 숫자를 찾는다.
  if (N.length < k) {
    console.log("1023456789".slice(0, k));
    return;
  }

  // N 을 자릿수마다 순회하면서 아래 사항을 확인한다.
  // - checked: 어떤 숫자가 몇 번 쓰였는지 카운트
  // - checkedCount: 총 몇 가지의 숫자가 쓰였는지 카운트
  const checked = new Array(10).fill(0);
  let checkedCount = 0;
  for (let i = 0; i < N.length; i++) {
    checked[+N[i]] += 1;
    if (checked[+N[i]] === 1) {
      checkedCount += 1;
    }
  }

  // checkedCount 와 k 가 같으면 N 자체가 우리가 찾으려던 답이다.
  if (checkedCount === k) {
    console.log(N);
    return;
  }

  // 1의자리 숫자부터 가장 큰 자릿수 숫자까지 역순으로 순회하면서
  // 각 자릿수의 숫자를 높여보면서 답이 있는지 확인한다.
  for (let i = N.length - 1; i >= 0; i--) {
    // 현재 자릿수의 숫자를 제거한다.
    // checked, checkoutCount 에서도 제외시킨다.
    const n = +N[i];
    checked[n] -= 1;
    if (!checked[n]) {
      checkedCount -= 1;
    }

    // 원래 숫자보다 큰 숫자들을 순회하면서 답이 있는지 찾는다.
    for (let cand = n + 1; cand <= 9; cand++) {
      // 테스트할 숫자(cand)를 checked, checkedCount 에 추가한다.
      checked[cand] += 1;
      if (checked[cand] === 1) {
        checkedCount += 1;
      }

      // checkedCount 와 k 가 같다면 (= 조건의 맞는 숫자를 찾았다면)
      if (checkedCount === k) {
        // 현재 자릿수보다 낮은 자릿수의 숫자는 모두 checked 의 가장 작은 숫자로 채워서 답을 만든다.
        const filled = `${checked.findIndex((it) => it > 0)}`.repeat(
          N.length - i - 1
        );
        console.log(`${N.slice(0, i)}${cand}${filled}`);
        return;

        // 아직 checkedCount 가 k 보다 작다면
      } else if (checkedCount < k) {
        const restLen = N.length - (i + 1);
        // 사용해야할 숫자의 갯수(k - checkedCount)가
        // 현재 자릿수보다 작은 자릿수의 갯수(restLen)보다 적거나 같은지 확인한다.
        // 만약 조건이 맞다면 답을 만들 수 있다.
        if (k - checkedCount <= restLen) {
          // 현재 자릿수보다 큰 자릿수는 N 에서 그대로 가져오고
          // 현재 자리수는 테스트하고 있던 숫자(cand) 를 넣는다.
          let result = `${N.slice(0, i)}${cand}`;

          // 현재 자릿수보다 작은 자릿수는
          // 사용한 적 없는 숫자와 사용한 적 있는 숫자를 적절히 조합해서
          // 가장 작은 수를 만든다.
          for (let j = 0; j < restLen; j++) {
            const checkedMin = checked.findIndex((it) => it > 0);
            if (checkedCount === k) {
              result = `${result}${checkedMin}`;
              continue;
            }
            const res = checked.findIndex((it) => it === 0);
            if (res > checkedMin && k - checkedCount < restLen - j) {
              result = `${result}${checkedMin}`;
            } else {
              checked[res] += 1;
              checkedCount += 1;
              result = `${result}${res}`;
            }
          }

          console.log(result);
          return;
        }
      }

      // 테스트가 다 끝났는데 답을 찾지 못했다면
      // cand 를 checked, checkedCount 에서 제외시킨다.
      checked[cand] -= 1;
      if (!checked[cand]) {
        checkedCount -= 1;
      }
    }
  }

  // 여기까지 왔다면 N 과 같은 자릿수의 숫자에는 답이 없다는 뜻이다.
  // N 보다 자릿수가 1 큰 숫자들 중 k 조건이 맞는 가장 작은 수가 답이다.
  const length = N.length + 1;
  console.log(`1${"0".repeat(length - (k - 1))}23456789`.slice(0, length));
}

//////
////
// input

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const cases = input
  .split("\n")
  .filter((it) => !!it)
  .map((it) => it.trim().split(" "));

cases.forEach((it) => {
  solution(...it);
});
