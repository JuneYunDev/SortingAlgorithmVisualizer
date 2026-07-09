const partition = (array, start, end, animations) => {
  const pivot = array[end];
  let smallerIndex = start - 1;

  for (let currentIndex = start; currentIndex < end; currentIndex++) {
    animations.push({
      type: "compare",
      indices: [currentIndex, end],
    });

    if (array[currentIndex].value <= pivot.value) {
      smallerIndex++;

      if (smallerIndex !== currentIndex) {
        const temp = array[smallerIndex];
        array[smallerIndex] = array[currentIndex];
        array[currentIndex] = temp;

        animations.push({
          type: "swap",
          indices: [smallerIndex, currentIndex],
          array: [...array],
        });
      }
    }

    animations.push({
      type: "reset",
      indices: [currentIndex, end],
    });
  }

  const pivotIndex = smallerIndex + 1;

  if (pivotIndex !== end) {
    const temp = array[pivotIndex];
    array[pivotIndex] = array[end];
    array[end] = temp;

    animations.push({
      type: "swap",
      indices: [pivotIndex, end],
      array: [...array],
    });
  }

  animations.push({
    type: "sorted",
    index: pivotIndex,
  });

  return pivotIndex;
};

const quickSortRecursion = (array, start, end, animations) => {
  if (start > end) {
    return;
  }

  if (start === end) {
    animations.push({
      type: "sorted",
      index: start,
    });
    return;
  }

  const pivotIndex = partition(array, start, end, animations);

  quickSortRecursion(array, start, pivotIndex - 1, animations);
  quickSortRecursion(array, pivotIndex + 1, end, animations);
};

export const quickSort = (array) => {
  const animations = [];
  const sortingArray = [...array];

  quickSortRecursion(sortingArray, 0, sortingArray.length - 1, animations);

  return animations;
};
