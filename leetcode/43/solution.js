var multiply = function (num1, num2) {
  // 둘 중 하나라도 "0" 이라면 바로 결과를 반환한다.
  if (num1 === "0") return "0";
  if (num2 === "0") return "0";

  // 곱셈을 편하게 하기 위해 두 숫자를 배열로 만든뒤 뒤집는다.
  // 뒤집는 건 사실 필수가 아니지만, 인덱스를 좀 더 편하게 생각하려고 뒤집었다.
  const a1 = num1.split("").reverse();
  const a2 = num2.split("").reverse();

  let result = ["0"];
  for (let j = 0; j < a2.length; j++) {
    // (`num1` * `num2` 의 j 번째 숫자) 의 결과를 얻는다.
    // `getMultiplyWithOneDigit` 함수의 코드는 26 라인에 나온다.
    const subResult = getMultiplyWithOneDigit(a1, a2[j], j);
    // 결과값에 `subResult` 값을 합산한다.
    // `addTo` 함수의 코드는 59 라인에 나온다.
    addTo(result, subResult);
  }

  // 결과를 반환한다.
  return result.reverse().join("");
};

// a1 과 n 을 곱한다. (digit 는 n 이 a2 의 몇 번째 자릿수였는지 알려주는 값.)
var getMultiplyWithOneDigit = function (a1, n, digit) {
  // 곱하려는 값이 "0" 이면 "0" 을 바로 반환한다.
  if (n === "0") {
    return ["0"];
  }

  // `n` 의 자릿수만큼 "0"으로 채운다.
  // 예를 들어 `a1` 이 "123" 이고 `n` 이 "456" 중에 "4" 였다고 하면
  // 두 수의 곱의 결과는 "492" 지만, `n` 이 백의 자리 숫자였으므로
  // 결과에 합산하기 편하게 "49200" 으로 만들어준 것.
  const result = new Array(digit).fill("0");

  // `a1` 의 자릿수 별로 `n` 을 곱한다.
  // 곱한 결과가 10 이상이면 (결과 % 10) 만 저장하고
  // (결과 / 10) 은 다음 자릿수로 넘긴다.
  let more = 0;
  for (let i = 0; i < a1.length; i++) {
    const multiplied = +a1[i] * +n + more;
    const subResult = multiplied % 10;
    result.push(`${subResult}`);
    more = Math.floor(multiplied / 10);
  }

  // 다 곱했는데도 `more` 에 값이 있다는 것은 최종 자릿수의 곱셈 결과가
  // 10 이상이었다는 뜻이다. 그렇다면 해당 값도 밀어넣어주자.
  if (more > 0) {
    result.push(`${more}`);
  }

  return result;
};

// `result` 와 `adding` 을 더한다.
var addTo = function (result, adding) {
  // 더하려는 값 `adding` 이 "0" 이면 더해봤자 결과가 같으므로 바로 종료한다.
  if (adding.length === 1 && adding[0] === "0") {
    return;
  }

  let i = 0;
  let more = 0;

  // `result` 와 `adding" 을 자릿수별로 차례차례 더해서
  // 다시 `result` 에 넣는다.
  while (i < result.length || i < adding.length) {
    const added = +(result[i] ?? "0") + +(adding[i] ?? "0") + more;

    // (더한 결과 % 10) 만 현재 자릿수 값에 반영하고
    // (더한 결과 / 10) 은 다음 자릿수에 넘긴다.
    result[i] = `${added % 10}`;
    more = Math.floor(added / 10);

    i += 1;
  }

  // 덧셈을 다 끝냈는데 `more` 에 값이 남았다면 해당 값은 맨 앞자리에 붙여준다.
  if (more > 0) {
    result.push(`${more}`);
  }

  // `result` 에 결과를 바로 반영했으므로 값을 따로 반환할 필요는 없다.
};
