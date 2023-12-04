(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);

  const NUMBER_WORDS_MAP = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const result = INPUT.map(
    line =>
      extractFirstAppearingDigitInString(line) * 10 +
      extractLastAppearingDigitInString(line),
  ).reduce(sum);

  console.log(result);

  function extractFirstAppearingDigitInString(string) {
    // with a regex, find the first digit in the string
    // it can be either a digit char or a string of the word "one", "two" etc.
    const firstDigitStr = string.match(
      /\d|one|two|three|four|five|six|seven|eight|nine/,
    )?.[0];
    if (firstDigitStr) return parseDigitString(firstDigitStr);
    throw new Error(`No digit found in string ${string}`);
  }

  function extractLastAppearingDigitInString(string) {
    // with a regex, find the last digit in the string
    // it can be either a digit char or a string of the word "one", "two" etc.
    const reversedString = string.split('').reverse().join('');
    const lastDigitStr = reversedString.match(
      /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/,
    )?.[0];
    if (lastDigitStr)
      return parseDigitString(lastDigitStr.split('').reverse().join(''));
    throw new Error(`No digit found in string ${string}`);
  }

  function parseDigitString(digitString) {
    if (digitString.match(/\d/)) {
      return parseInt(digitString, 10);
    } else {
      return NUMBER_WORDS_MAP[digitString];
    }
  }

  function sum(a, b) {
    return a + b;
  }
})();
