(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);

  const result = INPUT.map(
    line =>
      extractFirstAppearingDigitInString(line) * 10 +
      extractLastAppearingDigitInString(line),
  ).reduce(sum);

  console.log(result);

  function extractFirstAppearingDigitInString(string) {
    // with a regex, find the first digit in the string
    const firstDigitStr = string.match(/\d/)?.[0];
    if (firstDigitStr) return parseDigitString(firstDigitStr);
    throw new Error(`No digit found in string ${string}`);
  }

  function extractLastAppearingDigitInString(string) {
    // with a regex, find the last digit in the string
    const reversedString = string.split('').reverse().join('');
    const lastDigitStr = reversedString.match(/\d/)?.[0];
    if (lastDigitStr) return parseDigitString(lastDigitStr);
    throw new Error(`No digit found in string ${string}`);
  }

  function parseDigitString(digitString) {
    return parseInt(digitString, 10);
  }

  function sum(a, b) {
    return a + b;
  }
})();
