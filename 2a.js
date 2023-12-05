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

  // each game is considered "possible" if all draws have can be picked up from a bag of 12 red cubes, 13 green cubes, and 14 blue cubes
  const BAG = { red: 12, green: 13, blue: 14 };

  // we need to return the sum of ids of possible games

  const result = INPUT_OBJECTS.filter(isGamePossible).reduce(sumGameIds, 0);

  console.log(result);

  function isGamePossible(game) {
    return game.draws.every(draw => {
      return Object.keys(draw).every(color => {
        return draw[color] <= BAG[color];
      });
    });
  }

  function sumGameIds(sum, game) {
    return sum + game.gameId;
  }
})();
