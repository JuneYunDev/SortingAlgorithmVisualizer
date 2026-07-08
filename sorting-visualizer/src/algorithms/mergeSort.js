const merge = (left, right) => {
  const result = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value <= right[rightIndex].value) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
};

export const mergeSort = (array) => {
  const sortingArray = [...array];

  if (sortingArray.length <= 1) {
    return sortingArray;
  }

  const middle = Math.floor(sortingArray.length / 2);

  const leftHalf = sortingArray.slice(0, middle);
  const rightHalf = sortingArray.slice(middle);

  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  return merge(sortedLeft, sortedRight);
};
