//
// 채점 통과 실패
// 실패 사유: 시간 초과
// - 모든 경우의 수를 다 훓어보는 로직이므로 비효율적. 결과적으로 시간 안에 답을 낼 수 없었다.
//

function isValid(source, answer) {
  return source.slice(0, answer.length) <= answer.join("");
}

function getAnswer(source, k, answer = [], used = 0) {
  // source 자릿수와 answer 의 자릿수가 같으면 답을 찾았는지 확인한다.
  if (source.length === answer.length) {
    // k 가 여전히 0 보다 크면 k 개의 숫자를 사용하지 못한 것이므로 답이 아니다.
    if (k > 0) {
      return null;
    }
    // k === 0 일 경우 답이 맞다.
    return answer;
  }

  // 아직 source 의 자릿수보다 answer 의 자릿수가 작은 경우

  // 사용해야 할 숫자가 남았다면 0 부터 9 까지 모두 훑어본다.
  if (k > 0) {
    for (let n = 0; n <= 9; n++) {
      const newAnswer = [...answer, n];
      // n 을 answer 에 추가했을 때 적합하지 않다면 (newAnswer 가 source 보다 작다면)
      // 바로 다음 순회로 넘어간다.
      if (!isValid(source, newAnswer)) {
        continue;
      }

      // 숫자를 사용한 적이 있는지 없는지 상황에 맞게 getAnswer 를 호출한다.
      const usedAlready = used & (1 << n);
      const result = usedAlready
        ? getAnswer(source, k, newAnswer, used)
        : getAnswer(source, k - 1, newAnswer, used | (1 << n));

      // result 값이 null 이 아니라면 (답을 찾았다면) result 를 반환한다.
      if (result) {
        return result;
      }
    }
    return null;

    // - 숫자를 k 개만큼 모두 사용했다면
    //   사용한 적 있는 숫자들만 대상으로 백트래킹을 계속한다.
    // - 이 else 문과 위 if 문 내부가 매우 유사해서 다 푼 뒤에 리팩토링을 할까도 생각해봤지만
    //   시간 초과 때문에 채점을 통과하지 못해서 굳이 정리하지 않았다.
  } else {
    for (let n = 0; n <= 9; n++) {
      if (!(used & (1 << n))) {
        continue;
      }

      const newAnswer = [...answer, n];
      if (!isValid(source, newAnswer)) {
        continue;
      }
      const result = getAnswer(source, 0, newAnswer, used);
      if (result) {
        return result;
      }
    }

    return null;
  }
}

function solution(N, K) {
  const k = +K;

  // k 가 N 의 자릿수보다 클 경우 k 를 만족하는 제일 작은 숫자를 찾는다.
  if (k > N.length) {
    const result = getAnswer(`1${"0".repeat(k - 1)}`, k);
    console.log(result.join(""));
    return;
  }

  // k 가 N 의 자릿수보다 크지 않을 경우 백트래킹을 사용해 조건에 만족하는 제일 작은 수를 찾는다.
  const result = getAnswer(N, k);
  if (result) {
    console.log(result.join(""));
    return;
  }

  // - 위에서 답을 찾지 못했다면 N 과 같은 자릿수에는 답이 없는 것이므로 N 보다 자릿수가 1 큰 수에 대한 답을 찾는다.
  // - 나중에 다시 보니 이 상황에서는 "1000023456789" 처럼 0의 갯수와 총 길이만 다를 뿐
  //   항상 같은 형식의 답이 나오는데, 그걸 생각하지 못하고 `getAnswer` 를 다시 호출했다.
  console.log(getAnswer(`1${"0".repeat(N.length)}`, k).join(""));
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
