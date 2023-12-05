(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);



  // for each line, we have an object with two properties: ownNumbers and winningNumbers.
  // We want to find the number of ownNumbers that are winningNumbers.
  // Each line is worth 0 if no number is winning, 1 if one number is winning, 2 if two numbers are winning, 4 if three numbers are winning, 8 if four numbers are winning and so on, doubling the value for each additional winning number.

  const result = INPUT.map(line => {
    const infoS = line.split(':')[1];
    const winningStr = infoS.split('|')[0];
    const ownNumbersStr = infoS.split('|')[1];
    const winningNumbers = winningStr
      .split(' ')
      .map(n => parseInt(n, 10))
      .filter(n => !isNaN(n));
    const ownNumbers = ownNumbersStr
      .split(' ')
      .map(n => parseInt(n, 10))
      .filter(n => !isNaN(n));

    return { ownNumbers, winningNumbers };
  }).map(({ ownNumbers, winningNumbers }) => {
    const winningCount = ownNumbers.filter(n => winningNumbers.includes(n)).length;
    if (winningCount === 0) return 0;
    return Math.pow(2, winningCount - 1);
  }
  ).reduce((acc, curr) => acc + curr, 0);


  console.log(result);
})();
