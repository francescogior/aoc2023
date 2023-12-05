(() => {
  const INPUT = $('pre').textContent.split('\n').slice(0, -1);

  // Transform each line which is like
  // Game 1: 2 blue, 3 red; 3 green, 3 blue, 6 red; 4 blue, 6 red; 2 green, 2 blue, 9 red; 2 red, 4 blue
  // in an object like
  // { gameId: 1, draws: [{ blue: 2, red: 3 }, { green: 3, blue: 3, red: 6 }, ...]}], }

  const INPUT_OBJECTS = INPUT.map(parseLine);

  function parseLine(line) {
    const gameId = parseInt(line.split(':')[0].split(' ')[1], 10);
    const drawsString = line.split(':')[1].split(';');
    const draws = drawsString.map(drawString => {
      const draw = {};
      drawString.split(',').forEach(colorCountString => {
        const colorCount = colorCountString.trim().split(' ');
        draw[colorCount[1]] = parseInt(colorCount[0], 10);
      });
      return draw;
    });
    return { gameId, draws };
  }

  // for each game, we want to find the minimum number of red, green, and blue cubes that we need to add to the bag to make it possible
  // we need to return the product of these minimums (we call it the "power" of the game)
  // Then we add up the powers of all games

  const result = INPUT_OBJECTS.map(game => {
    const minReds = Math.max(...game.draws.map(draw => draw.red ?? 0));
    const minGreens = Math.max(...game.draws.map(draw => draw.green ?? 0));
    const minBlues = Math.max(...game.draws.map(draw => draw.blue ?? 0));
    return minReds * minGreens * minBlues;
  }).reduce(sum);

  console.log(result);

  function sum(a, b) {
    return a + b;
  }
})();
