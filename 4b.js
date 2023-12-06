(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);

  // for each line, we have an object with two properties: ownNumbers and winningNumbers.
  // We need to find the number of ownNumbers that are winningNumbers.
  // For each line, the n matching winning numbers makes you win n copies of the next lines.

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
    const winningCount = ownNumbers.filter(n =>
      winningNumbers.includes(n),
    ).length;
    return { copies: 1, winningCount };
  });

  // Now for each line, we add 1 copy to the next "winningCount" lines
  for (let i = 0; i < result.length; i++) {
    const { copies, winningCount } = result[i];
    for (let j = 1; j <= winningCount; j++) {
      result[i + j].copies += copies;
    }
  }

  // Now we just need to sum the number of copies
  const total = result.reduce((acc, { copies }) => acc + copies, 0);

  console.log(total);
})();
