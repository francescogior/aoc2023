(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1)
    .map(l => l.split(''));

  // INPUT is a 140*140 grid containing representing a map of galaxies (#) in the universe, empty space is represented by (.)

  // The universe is expanding, the empty rows and columns are expanding, it means that they are doubling their size, i.e. we have to duplicate the rows and columns that are empty

  // let's keep track of the index of the rows and columns that have to be duplicated

  const emptyRowsIndexes = INPUT.reduce((acc, row, index) => {
    if (row.every(c => c === '.')) {
      acc.push(index);
    }
    return acc;
  }, []);

  // to find the empty columns indexes, we transpose the matrix, then we do the same as above
  const TRANSPOSED_INPUT = INPUT[0].map((col, i) => INPUT.map(row => row[i]));
  const emptyColumnsIndexes = TRANSPOSED_INPUT.reduce((acc, row, index) => {
    if (row.every(c => c === '.')) {
      acc.push(index);
    }
    return acc;
  }, []);

  // now we have to duplicate the rows and columns that are empty
  const EXPANDED_ROWS_UNIVERSE = INPUT.reduce((acc, row, index) => {
    if (emptyRowsIndexes.includes(index)) {
      acc.push(row);
      acc.push(row);
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  // let's do the same for the columns

  // let's first transpose the expanded rows universe

  const EXPANDED_ROWS_UNIVERSE_TRANSPOSED = EXPANDED_ROWS_UNIVERSE[0].map(
    (col, i) => EXPANDED_ROWS_UNIVERSE.map(row => row[i]),
  );

  const EXPANDED_ROWS_AND_COLUMNS_UNIVERSE_TRANSPOSED =
    EXPANDED_ROWS_UNIVERSE_TRANSPOSED.reduce((acc, row, index) => {
      if (emptyColumnsIndexes.includes(index)) {
        acc.push(row);
        acc.push(row);
      } else {
        acc.push(row);
      }
      return acc;
    }, []);

  // finally, transpose the expanded rows and columns universe to get the final result

  const EXPANDED_UNIVERSE =
    EXPANDED_ROWS_AND_COLUMNS_UNIVERSE_TRANSPOSED[0].map((col, i) =>
      EXPANDED_ROWS_AND_COLUMNS_UNIVERSE_TRANSPOSED.map(row => row[i]),
    );

  // let's extract a list of all the galaxies coordinates

  let GALAXIES = [];
  for (let y = 0; y < EXPANDED_UNIVERSE.length; y++) {
    const row = EXPANDED_UNIVERSE[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        GALAXIES.push([y, x]);
      }
    }
  }

  // The shortest path between two galaxies is the number of steps needed to go from one galaxy to the other, following the shortest path.
  // Given their coordinates, the shortest path is the difference between the x coordinates and the y coordinates

  function distance([y1, x1], [y2, x2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  // let's compute the distance between each pair of galaxies
  // and sum all the distances
  // let's map GALAXIES to a list of distances to each other galaxy

  // Then, since we don't have to count the distances twice between each pair of galaxies, we will just divide the sum by 2

  // NB we are also computing the distance between a galaxy and itself,  but we don't care because it's 0
  const result =
    GALAXIES.map(galaxy1 =>
      GALAXIES.map(galaxy2 => distance(galaxy1, galaxy2)).reduce(
        (acc, d) => acc + d,
      ),
    ).reduce((acc, d) => acc + d) / 2;

  console.log(result);
})();
