(() => {
  const INPUT = $('pre').textContent.split('\n\n');

  const [directionsStr, nodesStr] = INPUT;

  // Array of "L" or "R"
  const DIRECTIONS = directionsStr.split('');

  // Map of node name => { R: node name, L: node name }
  const NODES = nodesStr
    .split('\n')
    .slice(0, -1)
    .reduce((acc, line) => {
      const [nodeName, rlNodesStr] = line.split(' = ');
      const L = rlNodesStr.slice(1, 4);
      const R = rlNodesStr.slice(6, 9);
      acc[nodeName] = { L, R };
      return acc;
    }, {});

  // We have to follow the path starting from "AAA" and going to "ZZZ"
  // The directions might might not be enough. If we have not reached ZZZ when directions are over, we repeat the directions.
  // We have to count the number of steps needed to go from AAA to ZZZ

  let currentNode = 'AAA';
  let steps = 0;
  while (true) {
    currentNode = NODES[currentNode][DIRECTIONS[steps % DIRECTIONS.length]];
    steps++;
    if (currentNode === 'ZZZ') {
      break;
    }
  }

  console.log(steps);
})();
