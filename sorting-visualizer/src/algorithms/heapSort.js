const heapify = (array, heapSize, rootIndex) => {
  let top = rootIndex;

  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;

  if (leftChild < heapSize && array[leftChild].value > array[top].value) {
    top = leftChild;
  }
  if (rightChild < heapSize && array[rightChild].value > array[top].value) {
    top = rightChild;
  }
  if (top !== rootIndex) {
    const temp = array[rootIndex];
    array[rootIndex] = array[top];
    array[top] = temp;

    heapify(array, heapSize, top);
  }
};

export const heapSort = (array) => {
  const sortingArray = [...array];

  for (let i = Math.floor(sortingArray.length / 2) - 1; i >= 0; i--) {
    heapify(sortingArray, sortingArray.length, i);
  }

  for (let end = sortingArray.length - 1; end > 0; end--) {
    const temp = sortingArray[0];
    sortingArray[0] = sortingArray[end];
    sortingArray[end] = temp;

    heapify(sortingArray, end, 0);
  }
  return sortingArray;
};
