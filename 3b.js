(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);

  // INPUT is a list of strings. Each string is made up of either number digits, or symbols (any char) or dots `.`. The dots are represent empty spaces.
  // If digits are adjacent, they form a number.

  // Let's find all the numbers and keep track of their positions (row index and column index of start point and end point).

  let numbers = [];
  for (let i = 0; i < INPUT.length; i++) {
    let currentNumber = '';
    let currentNumberStartRowIndex = null;
    let currentNumberStartColIndex = null;
    let currentNumberEndRowIndex = null;
    let currentNumberEndColIndex = null;

    const line = INPUT[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char >= '0' && char <= '9') {
        currentNumber += char;
      } else {
        if (currentNumber) {
          numbers.push({
            value: parseInt(currentNumber),
            start: { row: i, col: j - currentNumber.length },
            end: { row: i, col: j - 1 },
          });
          currentNumber = '';
        }
      }
    }
    // If we reach the end of the line and we still have a number, we need to add it to the list.
    if (currentNumber) {
      numbers.push({
        value: parseInt(currentNumber),
        start: { row: i, col: line.length - currentNumber.length },
        end: { row: i, col: line.length - 1 },
      });
    }
  }

  // Now, we want to select the numbers that are adjacent to some symbols (any char that is not a digit or a dot). Adjacent means that the coordinates of the start or end point of the number are equal to the coordinates of the symbol + 1 or -1. We called them "part numbers".

  const partNumbers = numbers.filter(number => {
    // we need to check if any of the coordinates of the number are adjacent to a symbol.
    const { start, end } = number;
    // let's build the list of coordinates of the number.
    let coordinates = [];
    for (let i = start.col; i <= end.col; i++) {
      coordinates.push({ row: start.row, col: i });
    }

    return coordinates.some(isAdjacentToSymbol);
  });

  function isAdjacentToSymbol({ row, col }) {
    const line = INPUT[row];
    const prevLine = INPUT[row - 1]; // may be null
    const nextLine = INPUT[row + 1]; // may be null
    const left = line?.[col - 1];
    const right = line?.[col + 1];
    const top = prevLine?.[col];
    const bottom = nextLine?.[col];
    const topLeft = prevLine?.[col - 1];
    const topRight = prevLine?.[col + 1];
    const bottomLeft = nextLine?.[col - 1];
    const bottomRight = nextLine?.[col + 1];
    return [
      left,
      right,
      top,
      bottom,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    ].some(char => char != null && char !== '.' && isNaN(parseInt(char, 10)));
  }

  // Now, let's define a gear. A gear is a `*` symbol that is adjacent to exactly 2 part numbers. We need to find all the gears and keep track of the gear ratio, i.e. the product of the 2 numbers adjacent to the gear.

  let gears = [];
  for (let i = 0; i < INPUT.length; i++) {
    const line = INPUT[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '*') {
        const adjacentNumbers = partNumbers.filter(number =>
          isAdjacentToNumber(number, i, j),
        );
        if (adjacentNumbers.length === 2) {
          gears.push({
            adjacentNumbers,
            ratio: adjacentNumbers[0].value * adjacentNumbers[1].value,
          });
        }
      }
    }
  }

  console.log(partNumbers);
  console.log(gears);

  //  Finally, return the sum of all the gear ratios.
  const result = gears.reduce((acc, gear) => acc + gear.ratio, 0);
  console.log(result);

  function isAdjacentToNumber(number, row, col) {
    const { start, end } = number;
    const coordinates = [];
    for (let i = start.col; i <= end.col; i++) {
      coordinates.push({ row: start.row, col: i });
    }

    return coordinates.some(
      ({ row: numberRow, col: numberCol }) =>
        (numberRow === row && numberCol === col - 1) ||
        (numberRow === row && numberCol === col + 1) ||
        (numberRow === row - 1 && numberCol === col) ||
        (numberRow === row + 1 && numberCol === col) ||
        (numberRow === row - 1 && numberCol === col - 1) ||
        (numberRow === row - 1 && numberCol === col + 1) ||
        (numberRow === row + 1 && numberCol === col - 1) ||
        (numberRow === row + 1 && numberCol === col + 1),
    );
  }
})();
