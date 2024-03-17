const SIZE = 10000;
function solution() {
  const checked = new Array(SIZE + 1).fill(true);
  checked[0] = false;
  for (let i = 1; i <= SIZE; i++) {
    checked[i + `${i}`.split("").reduce((acc, item) => acc + +item, 0)] = false;
  }
  console.log(
    checked
      .reduce((acc, item, idx) => {
        if (item) {
          acc.push(idx);
        }
        return acc;
      }, [])
      .join("\n")
  );
}

//////
////
// input

solution();
