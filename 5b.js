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
  // to interpret the source, we consider the number in pairs, the first number is the start of the range, the second number is the length of the range, the next number is the start of the next range, and so on. So the input is the union of all these ranges

  // let's write REAL_SOURCE as a list of ranges of the form { start, length }
  const REAL_SOURCE = SOURCE.reduce((acc, n, i) => {
    if (i % 2 === 0) {
      acc.push({ start: n, length: SOURCE[i + 1] });
    }
    return acc;
  }, []);

  // We need to find the lowest mapped number
  // but the input is too large. So we could do the reverse. We start from 0 and we map back. If the result is included in one of the ranges of the source, then we are done. Otherwise, we increment the number and try again.

  const REVERSED_MAPS = INPUT.slice(1).reverse();

  let result = 0;

  while (true) {
    if (result % 100000 === 0) {
      console.log('checking numbers between', result, 'and', result + 100000);
    }
    let mapped = result;
    for (const ranges of REVERSED_MAPS) {
      for (const [destinationStart, sourceStart, length] of ranges) {
        if (mapped >= destinationStart && mapped < destinationStart + length) {
          mapped = mapped + (sourceStart - destinationStart);
          break;
        }
      }
    }
    if (
      REAL_SOURCE.some(
        ({ start, length }) => mapped >= start && mapped < start + length,
      )
    ) {
      break;
    }
    result++;
  }

  console.log(result);
})();
