export const bubbleSort = (array) => {
  const animationStep = [];
  const sortingArray = [...array];

  for (let i = 0; i < sortingArray.length - 1; i++) {
    for (let j = 0; j < sortingArray.length - i - 1; j++) {
      animationStep.push({
        type: "compare",
        indices: [j, j + 1],
      });

      if (sortingArray[j].value > sortingArray[j + 1].value) {
        const current = sortingArray[j];
        const next = sortingArray[j + 1];

        sortingArray[j] = next;
        sortingArray[j + 1] = current;

        animationStep.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...sortingArray],
        });
      }

      animationStep.push({
        type: "reset",
        indices: [j, j + 1],
      });
    }

    animationStep.push({
      type: "sorted",
      index: sortingArray.length - i - 1,
    });
  }

  animationStep.push({
    type: "sorted",
    index: 0,
  });

  return animationStep;
};
