(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .map(l => l.split(' ').map(Number));

  // The input represents a list of lists of numbers
  // We have to "predict" the next number of each list

  // To do that, for each list we find the "derivatives" of the list, by computing the difference between each number and the previous one

  // If the derivative is a list of 0s, we stop, otherwise we repeat the process on the derivative until we get a list of 0s

  // Say the first derivative is of order 1, the second derivative is of order 2, and so on (the derivative of all 0s being of order "n")

  // Then starting from the derivative of order "n-1", (NB: this will always be a list of constant numbers) we can predict the next number of the list by adding the last number of the derivative of order "n" (i.e. a 0) to the last number of the derivative of order "n-1".

  // Then we do the same for the derivative of order "n-2": we find the next number of the list by adding the last number of the derivative of order "n-1" to the last number of the derivative of order "n-2".

  // We repeat the process until we get the next number of the original list.

  // Then we sum all the next numbers of all the lists

  const result = INPUT.map(list => {
    let derivatives = [list];
    let derivative = list;
    let order = 0;
    while (!isZeroList(derivative)) {
      derivative = getDerivative(derivative);
      // add derivative at the beginning of the list
      derivatives.unshift(derivative);
      order++;
    }
    return derivatives.reduce((acc, derivative, index) => {
      if (index === 0) {
        return acc;
      }
      acc[index].push(
        acc[index - 1][acc[index - 1].length - 1] +
          derivative[derivative.length - 1],
      );

      return acc;
    }, derivatives);
  })
    .map(
      derivatives =>
        derivatives[derivatives.length - 1][
          derivatives[derivatives.length - 1].length - 1
        ],
    )
    .reduce(sum);

  function getDerivative(list) {
    return list.map((n, i) => n - (list[i - 1] || 0)).slice(1);
  }

  function isZeroList(list) {
    return list.every(n => n === 0);
  }

  function sum(a, b) {
    return a + b;
  }

  console.log(result);
})();
