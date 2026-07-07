export const selectionSort = (array) => {
  const animations = [];
  const sortingArray = [...array];

  for (let i = 0; i < sortingArray.length - 1; i++) {
    let minIndex = i;

    animations.push({
      type: "compare",
      indices: [i],
    });

    for (let j = i + 1; j < sortingArray.length; j++) {
      animations.push({
        type: "compare",
        indices: [minIndex, j],
      });

      if (sortingArray[minIndex].value > sortingArray[j].value) {
        animations.push({
          type: "reset",
          indices: [minIndex],
        });

        minIndex = j;
      }

      animations.push({
        type: "reset",
        indices: [j],
      });
    }

    if (minIndex !== i) {
      const temp = sortingArray[i];
      sortingArray[i] = sortingArray[minIndex];
      sortingArray[minIndex] = temp;

      animations.push({
        type: "swap",
        indices: [i, minIndex],
        array: [...sortingArray],
      });
    }

    animations.push({
      type: "sorted",
      index: i,
    });
  }

  animations.push({
    type: "sorted",
    index: sortingArray.length - 1,
  });

  return animations;
};
