(() => {
  const INPUT_ = $('pre')
    .textContent.split('\n')
    .slice(0, -1)
    .map(l =>
      parseInt(
        l
          .split('')
          .map(s => parseInt(s))
          .filter(s => !isNaN(s))
          .join(''),
      ),
    );

  const INPUT = {
    time: INPUT_[0],
    recordDistance: INPUT_[1],
  };

  console.log(INPUT);

  // The INPUT represents a race that lasts `time` milliseconds and has a record distance of `recordDistance`
  // To participate in the race, one can decide to hold the button for a certain amount of time. The longer you hold the button, the faster you go. But you can't hold the button for more than `time` milliseconds.
  // For each millisecond you hold the button, you go 1 unit faster than the previous millisecond. So if you hold the button for 1 milliseconds, you go 1 millimiter/millisecond faster than the previous millisecond. If you hold the button for 2 milliseconds, you go 2 millimiters/millisecond faster than the previous millisecond, and so on.

  // We need to count in how many ways we can beat the record i.e. for how many X
  //  (n-X)*X > recordDistance

  const { time, recordDistance } = INPUT;
  let count = 0;
  for (let i = 1; i < time; i++) {
    if ((time - i) * i > recordDistance) {
      count++;
    }
  }

  console.log(count);
})();
