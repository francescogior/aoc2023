(() => {
  const INPUT = $('pre').textContent.split('\n\n');

  const [directionsStr, nodesStr] = INPUT;

  // Array of "L" or "R"
  const DIRECTIONS = directionsStr.split('');

  // Map of node name => { R: node name, L: node name }
  // node names are 3 letter codes like "AAA", "XYB", "VVG", ...
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

  // We have to follow the paths starting from nodes ending in "A" and going to nodes ending in "Z".
  // The directions might might not be enough. If we have not reached paths all ending in Z when directions are over, we repeat the directions.
  // We have to count the number of steps needed to go from the xxA nodes to xxZ nodes.
  // NB: all paths must end in nodes ending in Z. If only some paths end in nodes ending in Z, we have to continue going

  let currentNodes = Object.keys(NODES).filter(n => n.endsWith('A'));

  // We could brute force the below, but it's too slow

  // let steps = 0;
  // while (true) {
  //   currentNodes = currentNodes.map(
  //     n => NODES[n][DIRECTIONS[steps % DIRECTIONS.length]],
  //   );
  //   steps++;
  //   if (currentNodes.every(n => n.endsWith('Z'))) {
  //     break;
  //   }
  // }

  // Instead, run a loop for each node and then do the lcm of the steps

  const steps = currentNodes
    .map(n => {
      let currentNode = n;
      let steps = 0;
      while (true) {
        currentNode = NODES[currentNode][DIRECTIONS[steps % DIRECTIONS.length]];
        steps++;
        if (currentNode.endsWith('Z')) {
          break;
        }
      }
      return steps;
    })
    .reduce(lcm);

  console.log(steps);

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function gcd(a, b) {
    if (a === 0) {
      return b;
    }
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
})();
