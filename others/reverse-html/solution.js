function solution(html) {
  const stack = [];

  while (html.length) {
    // 여는 태그인지 닫는 태그인지 관계 없이, 가장 앞의 태그 문자열을 찾는다.
    const tag = html.match(/<[^>]+>/)?.[0];

    // 태그 문자열이 없으면 반복문을 나간다.
    // 정상적인 입력이라면 이 조건에 해당될 일은 없다. 무조건 4 라인의 조건에 의해서만 while 문을 빠져나간다.
    if (!tag) {
      break;
    }

    // 6 라인에서 찾은 tag 문자열이 html 에서 어디에 위치하는 지 찾는다.
    const tagIndex = html.indexOf(tag);

    // 만약 위치가 0보다 크다면 태그 앞에 태그가 아닌 문자열이 존재한다는 뜻이다.
    if (tagIndex > 0) {
      // 태그가 아닌 문자열을 스택에 넣는다.
      // 문자열의 경우에는 스택에 넣을 때 미리 뒤집어서 넣는다.
      stack.push({
        type: "string",
        content: reverseString(html.slice(0, tagIndex)),
      });
      // 스택에 넣은 문자열은 html 에서 제거한다.
      html = html.slice(tagIndex);
    }

    // tag 가 여는 태그인지 닫는 태그인지 확인한다.
    const tagType = tag.match(/<\//) ? "close" : "open";
    if (tagType === "open") {
      // 여는 태그였다면 스택에 넣는다.
      stack.push({ type: tagType, content: tag });
    } else {
      // 닫는 태그였다면 직전 여는 태그부터 이 태그까지 사이에 있는 컨텐츠들을 뒤집는다.
      // `reverseContent` 함수에 대한 자세한 설명은 43 라인을 보자.
      reverseContent(stack, tag);
    }
    html = html.replace(tag, "");
  }
  return stack[0].content;
}

// 37 라인에서 넘어온다.
function reverseContent(stack, closeTag) {
  const contents = [];
  // 정상적인 stack 이라면 여는 태그가 무조건 하나 이상 존재하기 때문에
  // 54 라인 if 문에 걸려서 이 while 문을 빠져나가게 된다.
  // 따라서 while 문의 조건이 true 인 것은 문제 없다.
  while (true) {
    // 스택에서 pop 한다.
    const item = stack.pop();

    // pop 한 아이템이 여는 태그였다면
    if (item.type === "open") {
      stack.push({
        type: "contents",
        // 여태까지 pop 했던 아이템들을 모두 연결한다.
        // pop 할 때마다 contents 에 push 해두었기 때문에 .join('') 으로 연결만 해도
        // 자연스럽게 순서가 반대가 되어 합쳐진다.
        content: `${item.content}${contents.join("")}${closeTag}`,
      });
      // 그리고 while 문을 빠져나간다.
      break;
    }

    // pop 한 아이템이 여는 태그가 아니었다면 contents 에 아이템을 밀어넣는다.
    contents.push(item.content);
  }
}

function reverseString(string) {
  return string.split("").reverse().join("");
}
