export const insertionSort = (array) => {
  const animations = [];
  const sortingArray = [...array];

  for (let i = 1; i < sortingArray.length; i++) {
    let currentIndex = i;

    while (
      currentIndex > 0 &&
      sortingArray[currentIndex - 1].value > sortingArray[currentIndex].value
    ) {
      animations.push({
        type: "compare",
        indices: [currentIndex - 1, currentIndex],
      });

      const temp = sortingArray[currentIndex];
      sortingArray[currentIndex] = sortingArray[currentIndex - 1];
      sortingArray[currentIndex - 1] = temp;

      animations.push({
        type: "swap",
        indices: [currentIndex - 1, currentIndex],
        array: [...sortingArray],
      });

      animations.push({
        type: "reset",
        indices: [currentIndex - 1, currentIndex],
      });

      currentIndex--;
    }
  }

  for (let i = 0; i < sortingArray.length; i++) {
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
};
