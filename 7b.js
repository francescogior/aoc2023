(() => {
  const CARDS_RANK = 'J23456789TQKA'.split('');
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

  // J are JOKERS, they can be used as any card to maximize the rank of the hand

  // In case of same rank, we compare the card (in order of appearance) from the highest to the lowest i.e. AA777 beats 66AAA because they both have a full house but the first hand has A as first card while the second hand has 6 as first card.
  // JOKERS are always the lowest card in the hand

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
    // we can remove the JOKERS from the hand

    // If we remove 1 joker:
    // then, every 4 of a kind becomes a 5 of a kind
    // every 3 of a kind becomes a 4 of a kind
    // every pair becomes a 3 of a kind
    // every 2 pairs becomes a full house
    // every high card becomes a pair

    // If we remove 2 jokers:
    // then, every 3 of a kind becomes a 5 of a kind
    // every pair becomes a 4 of a kind
    // every high card becomes a 3 of a kind

    // If we remove 3 jokers:
    // then, every pair becomes a 5 of a kind
    // every high card becomes a 4 of a kind

    // If we remove 4 jokers:
    // then, every high card becomes a 5 of a kind

    // If we remove 5 jokers:
    // every hand becomes a 5 of a kind

    const handWithoutJokers = hand.filter(c => c !== 'J');

    const removedJokers = hand.length - handWithoutJokers.length;

    const counts = handWithoutJokers.reduce((acc, c) => {
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});

    const countsValues = Object.values(counts);

    const maxCount = Math.max(...countsValues);

    if (maxCount === 5) {
      return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
    }
    if (maxCount === 4) {
      if (removedJokers === 1) {
        return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
      }
      return HANDS_RANK.indexOf('FOUR_OF_A_KIND');
    }
    if (maxCount === 3) {
      if (removedJokers === 1) {
        return HANDS_RANK.indexOf('FOUR_OF_A_KIND');
      }
      if (removedJokers === 2) {
        return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
      }
      // else, removedJokers === 0
      if (countsValues.length === 2) {
        return HANDS_RANK.indexOf('FULL_HOUSE');
      }
      return HANDS_RANK.indexOf('THREE_OF_A_KIND');
    }
    if (maxCount === 2) {
      if (removedJokers === 1) {
        if (countsValues.length === 2) {
          return HANDS_RANK.indexOf('FULL_HOUSE');
        }
        return HANDS_RANK.indexOf('THREE_OF_A_KIND');
      }
      if (removedJokers === 2) {
        return HANDS_RANK.indexOf('FOUR_OF_A_KIND');
      }
      if (removedJokers === 3) {
        return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
      }
      // else, removedJokers === 0
      if (countsValues.length === 3) {
        return HANDS_RANK.indexOf('TWO_PAIRS');
      }
      return HANDS_RANK.indexOf('PAIR');
    }
    if (maxCount === 1) {
      if (removedJokers === 1) {
        // maxCount === 1
        return HANDS_RANK.indexOf('PAIR');
      }
      if (removedJokers === 2) {
        return HANDS_RANK.indexOf('THREE_OF_A_KIND');
      }
      if (removedJokers === 3) {
        return HANDS_RANK.indexOf('FOUR_OF_A_KIND');
      }
      if (removedJokers === 4) {
        return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
      }
      return HANDS_RANK.indexOf('HIGH_CARD');
    }

    // maxCount === 0 i.e. we have removed 5 jokers!
    return HANDS_RANK.indexOf('FIVE_OF_A_KIND');
  }

  // After sorting the hands, we need to multiply the bet by the rank of the hand (starting from 1 for the lowest rank

  const SORTED_HANDS = INPUT.sort((h1, h2) => sortHands(h1.hand, h2.hand));

  const result = SORTED_HANDS.reduce((acc, { bet }, index) => {
    return acc + bet * (index + 1);
  }, 0);

  console.log(SORTED_HANDS, result);
})();
