(() => {
  const CARDS_RANK = '23456789TJQKA'.split('');
  const HANDS_RANK = [
    'HIGH_CARD',
    'PAIR',
    'TWO_PAIRS',
    'THREE_OF_A_KIND',
    'FULL_HOUSE',
    'FOUR_OF_A_KIND',
    'FIVE_OF_A_KIND',
  ];

  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1)
    .map(l => {
      const [handStr, betStr] = l.split(' ');
      const hand = handStr.split('');
      const bet = parseInt(betStr, 10);
      return { hand, bet };
    });

  // we need to sort the hands by rank
  // rank are similar to poker hands, but with some differences:
  // FIVE of a kind
  // FOUR of a kind
  // FULL HOUSE: three of a kind and a pair
  // THREE of a kind
  // TWO PAIRS
  // PAIR
  // HIGH CARD
  // In case of same rank, we compare the card (in order of appearance) from the highest to the lowest i.e. AA777 beats 66AAA because they both have a full house but the first hand has A as first card while the second hand has 6 as first card

  function sortHands(hand1, hand2) {
    const rank1 = getRank(hand1);
    const rank2 = getRank(hand2);
    if (rank1 !== rank2) {
      return rank1 - rank2;
    }
    // same rank
    for (let i = 0; i < hand1.length; i++) {
      if (hand1[i] !== hand2[i]) {
        return CARDS_RANK.indexOf(hand1[i]) - CARDS_RANK.indexOf(hand2[i]);
      }
    }
    // well, they are the same
    return 0;
  }

  function getRank(hand) {
    const counts = hand.reduce((acc, c) => {
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    const countsValues = Object.values(counts);
    const maxCount = Math.max(...countsValues);
    if (maxCount === 5) {
      return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
    }
    if (maxCount === 4) {
      return HANDS_RANK.indexOf('FOUR_OF_A_KIND');
    }
    if (maxCount === 3) {
      if (countsValues.length === 2) {
        return HANDS_RANK.indexOf('FULL_HOUSE');
      }
      return HANDS_RANK.indexOf('THREE_OF_A_KIND');
    }
    if (maxCount === 2) {
      if (countsValues.length === 3) {
        return HANDS_RANK.indexOf('TWO_PAIRS');
      }
      return HANDS_RANK.indexOf('PAIR');
    }
    return HANDS_RANK.indexOf('HIGH_CARD');
  }

  // After sorting the hands, we need to multiply the bet by the rank of the hand (starting from 1 for the lowest rank

  const result = INPUT.sort((h1, h2) => sortHands(h1.hand, h2.hand)).reduce(
    (acc, { bet }, index) => {
      return acc + bet * (index + 1);
    },
    0,
  );

  console.log(result);
})();
