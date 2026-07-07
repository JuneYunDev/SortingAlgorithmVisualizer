export const bubbleSort = (array) => {
  const animationSetps = [];
  const sortingArray = [...array];

  for (let i = 0; i < sortingArray.length - 1; i++) {
    for (let j = 0; j < sortingArray.length - i - 1; j++) {
      animationSetps.push({
        type: "compare",
        indices: [j, j + 1],
      });

      if (sortingArray[j] > sortingArray[j + 1]) {
        const current = sortingArray[j];
        const next = sortingArray[j + 1];

        sortingArray[j] = next;
        sortingArray[j + 1] = current;

        animationSetps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...sortingArray],
        });
      }

      animationSetps.push({
        type: "reset",
        indices: [j, j + 1],
      });
    }

    animationSetps.push({
      type: "sorted",
      index: sortingArray.length - i - 1,
    });
  }

  animationSetps.push({
    type: "sorted",
    index: 0,
  });

  return animationSetps;
};
