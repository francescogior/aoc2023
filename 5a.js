(() => {
  const INPUT = $('pre')
    .textContent.split('\n\n')
    .map((l, i, { length }) => {
      if (i === 0) {
        return l.split(': ')[1].split(' ').map(Number);
      }
      return l
        .split('\n')
        .slice(1, i === length - 1 ? -1 : Infinity)
        .map(l => l.split(' ').map(Number));
    });

  // the first line represents the input while the next lines represents maps/functions in the form of list of triples
  // each triple means: (destination start, source start, length)
  // if a number is not covered by any range, then it maps to itself

  // To map a number, we need to find the first range that contains it. The map would be number => number + (source start - destination start)

  const SOURCE = INPUT[0];
  const MAPS = INPUT.slice(1);

  const result = SOURCE.map(n => {
    let mapped = n;
    for (const ranges of MAPS) {
      for (const [destinationStart, sourceStart, length] of ranges) {
        if (mapped >= sourceStart && mapped < sourceStart + length) {
          mapped = mapped + (destinationStart - sourceStart);
          break;
        }
      }
    }
    return mapped;
  });

  // We need to find the lowest mapped number
  console.log(Math.min(...result));
})();
