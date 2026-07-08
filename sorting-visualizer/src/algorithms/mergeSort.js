const merge = (array, start, middle, end, animations) => {
  const left = array.slice(start, middle + 1);
  const right = array.slice(middle + 1, end + 1);

  let leftIndex = 0;
  let rightIndex = 0;
  let mainIndex = start;

  while (leftIndex < left.length && rightIndex < right.length) {
    animations.push({
      type: "compare",
      indices: [start + leftIndex, middle + 1 + rightIndex],
    });

    if (left[leftIndex].value <= right[rightIndex].value) {
      array[mainIndex] = left[leftIndex];

      animations.push({
        type: "overwrite",
        index: mainIndex,
        item: left[leftIndex],
        array: [...array],
      });

      leftIndex++;
    } else {
      array[mainIndex] = right[rightIndex];

      animations.push({
        type: "overwrite",
        index: mainIndex,
        item: right[rightIndex],
        array: [...array],
      });

      rightIndex++;
    }

    animations.push({
      type: "reset",
      indices: [start + leftIndex, middle + 1 + rightIndex],
    });

    mainIndex++;
  }

  while (leftIndex < left.length) {
    array[mainIndex] = left[leftIndex];

    animations.push({
      type: "overwrite",
      index: mainIndex,
      item: left[leftIndex],
      array: [...array],
    });

    leftIndex++;
    mainIndex++;
  }

  while (rightIndex < right.length) {
    array[mainIndex] = right[rightIndex];

    animations.push({
      type: "overwrite",
      index: mainIndex,
      item: right[rightIndex],
      array: [...array],
    });

    rightIndex++;
    mainIndex++;
  }
};

const mergeSortHelper = (array, start, end, animations) => {
  if (start >= end) return;

  const middle = Math.floor((start + end) / 2);

  mergeSortHelper(array, start, middle, animations);
  mergeSortHelper(array, middle + 1, end, animations);

  merge(array, start, middle, end, animations);
};

export const mergeSort = (array) => {
  const animations = [];
  const sortingArray = [...array];

  mergeSortHelper(sortingArray, 0, sortingArray.length - 1, animations);

  for (let i = 0; i < sortingArray.length; i++) {
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
};
