const partition = (array, start, end) => {
  const pivot = array[end];
  let smallerIndex = start - 1;

  for (let currentIndex = start; currentIndex < end; currentIndex++) {
    if (array[currentIndex].value <= pivot.value) {
      smallerIndex++;

      const temp = array[smallerIndex];
      array[smallerIndex] = array[currentIndex];
      array[currentIndex] = temp;
    }
  }
  const temp = array[smallerIndex + 1];
  array[smallerIndex + 1] = array[end];
  array[end] = temp;

  return smallerIndex + 1;
};

const quickSortRecursion = (array, start, end) => {
  if (start >= end) {
    return;
  }

  const pivotIndex = partition(array, start, end);

  quickSortRecursion(array, start, pivotIndex - 1);
  quickSortRecursion(array, pivotIndex + 1, end);
};

export const quickSort = (array) => {
  const sortingArray = [...array];

  quickSortRecursion(sortingArray, 0, sortingArray.length - 1);

  return sortingArray;
};
