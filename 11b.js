(() => {
  const UNIVERSE = $('pre')
    .textContent.split('\n')
    .slice(0, -1)
    .map(l => l.split(''));

  const EMPTY_ROWS_INDEXES = UNIVERSE.reduce((acc, row, index) => {
    if (row.every(c => c === '.')) {
      acc.push(index);
    }
    return acc;
  }, []);

  // to find the empty columns indexes, we transpose the matrix, then we do the same as above
  const EMPTY_COLUMNS_INDEXES = UNIVERSE[0]
    .map((col, i) => UNIVERSE.map(row => row[i]))
    .reduce((acc, row, index) => {
      if (row.every(c => c === '.')) {
        acc.push(index);
      }
      return acc;
    }, []);

  // let's extract a list of all the galaxies coordinates
  let GALAXIES = [];
  for (let y = 0; y < UNIVERSE.length; y++) {
    const row = UNIVERSE[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        GALAXIES.push([y, x]);
      }
    }
  }

  // We need to compute the distance between each pair of galaxies and sum all the distances
  // The distance between two galaxies is the number of steps needed to go from one galaxy to the other, following the shortest path.
  // But the universe is expanded, each empty row or column is 1000000-cated (one million!). So we need to take that into account when computing the distance between two galaxies.
  // Basically, if the coordinates of two galaxies have some empty rows or columns between them, we need to add 1000000 for each empty row or column between them.

  function distance([y1, x1], [y2, x2]) {
    const numberOfEmptyRowsBetween = EMPTY_ROWS_INDEXES.filter(
      index => index > Math.min(y1, y2) && index < Math.max(y1, y2),
    ).length;
    const numberOfEmptyColumnsBetween = EMPTY_COLUMNS_INDEXES.filter(
      index => index > Math.min(x1, x2) && index < Math.max(x1, x2),
    ).length;
    return (
      Math.abs(x1 - x2) +
      Math.abs(y1 - y2) +
      numberOfEmptyRowsBetween * 1000000 +
      numberOfEmptyColumnsBetween * 1000000
    );
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
