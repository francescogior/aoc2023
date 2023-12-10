(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1)
    .map(l => l.split(''));

  // INPUT is a 140*140 grid containing characters:

  // | is a vertical pipe connecting north and south.
  // - is a horizontal pipe connecting east and west.
  // L is a 90-degree bend connecting north and east.
  // J is a 90-degree bend connecting north and west.
  // 7 is a 90-degree bend connecting south and west.
  // F is a 90-degree bend connecting south and east.
  // . is ground; there is no pipe in this tile.
  // S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

  const PIPES_CONNECTING_SOUTH = ['|', '7', 'F'];
  const PIPES_CONNECTING_NORTH = ['|', 'L', 'J'];
  const PIPES_CONNECTING_EAST = ['-', 'L', 'F'];
  const PIPES_CONNECTING_WEST = ['-', 'J', '7'];

  const PIPES_COOR_MAP = {
    '|': [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    '-': [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ],
    L: [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
    ],
    J: [
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ],
    7: [
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ],
    F: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
  };

  // There is a loop pipe, which connects S to itself.
  // We need to find the distance of the farthest point from the starting point.

  // Starting from the starting point, let's follow the pipe until we reach a dead end.

  const START = findStart(INPUT);

  let path = [START];
  let distance = 0;
  let current = START;

  while (true) {
    current =
      current.x === START.x && current.y === START.y
        ? findFirstStep(INPUT, current)
        : findNextStep(INPUT, path.at(-2), current);
    distance++;
    path.push(current);
    if (current.x === START.x && current.y === START.y) {
      break;
    }
  }

  // The farthest point is the one with the highest distance from the starting point i.e. the distance divided by 2 (because we are counting the distance twice, once for each direction)

  const result = distance / 2;

  console.log(result);

  function findStart(grid) {
    for (let y = 0; y < grid.length; y++) {
      const row = grid[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 'S') {
          return { x, y };
        }
      }
    }
  }

  // first thing, is to figure out which direction we can go from the starting point.
  // we can go in any direction, if the adjacent tile is a compatible pipe.
  // i.e. the W pipe must be connecting E, the E pipe must be connecting W, the S pipe must be connecting N, the N pipe must be connecting S.

  function findFirstStep(grid, start) {
    const { x, y } = start;
    const tile = grid[y][x];
    const LEFT = grid[y][x - 1];
    if (PIPES_CONNECTING_EAST.includes(LEFT)) {
      return { x: x + 1, y };
    }
    const RIGHT = grid[y][x + 1];
    if (PIPES_CONNECTING_WEST.includes(RIGHT)) {
      return { x: x - 1, y };
    }
    const UP = grid[y - 1][x];
    if (PIPES_CONNECTING_SOUTH.includes(UP)) {
      return { x, y: y - 1 };
    }
    const DOWN = grid[y + 1][x];
    if (PIPES_CONNECTING_NORTH.includes(DOWN)) {
      return { x, y: y + 1 };
    }
    throw new Error('No compatible pipe found');
  }

  function findNextStep(grid, prev, current) {
    // we have just to follow the pipe, just not going back
    const { x, y } = current;
    const tile = grid[y][x];
    const [dir1, dir2] = PIPES_COOR_MAP[tile];
    const nextTile1 = { x: x + dir1.x, y: y + dir1.y };
    const nextTile2 = { x: x + dir2.x, y: y + dir2.y };
    // just discard the one that is prev and return the other
    if (nextTile1.x === prev.x && nextTile1.y === prev.y) {
      return nextTile2;
    }
    return nextTile1;
  }
})();
