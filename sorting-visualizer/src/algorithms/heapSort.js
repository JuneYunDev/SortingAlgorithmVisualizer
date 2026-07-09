const heapify = (array, heapSize, rootIndex, animations) => {
  let top = rootIndex;

  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;

  if (leftChild < heapSize) {
    animations.push({
      type: "compare",
      indices: [leftChild, top],
    });

    if (array[leftChild].value > array[top].value) {
      top = leftChild;
    }

    animations.push({
      type: "reset",
      indices: [leftChild, rootIndex],
    });
  }

  if (rightChild < heapSize) {
    animations.push({
      type: "compare",
      indices: [rightChild, top],
    });

    if (array[rightChild].value > array[top].value) {
      top = rightChild;
    }

    animations.push({
      type: "reset",
      indices: [rightChild, top],
    });
  }

  if (top !== rootIndex) {
    const temp = array[rootIndex];
    array[rootIndex] = array[top];
    array[top] = temp;

    animations.push({
      type: "swap",
      indices: [rootIndex, top],
      array: [...array],
    });

    heapify(array, heapSize, top, animations);
  }
};

export const heapSort = (array) => {
  const animations = [];
  const sortingArray = [...array];

  for (let i = Math.floor(sortingArray.length / 2) - 1; i >= 0; i--) {
    heapify(sortingArray, sortingArray.length, i, animations);
  }

  for (let end = sortingArray.length - 1; end > 0; end--) {
    const temp = sortingArray[0];
    sortingArray[0] = sortingArray[end];
    sortingArray[end] = temp;

    animations.push({
      type: "swap",
      indices: [0, end],
      array: [...sortingArray],
    });

    animations.push({
      type: "sorted",
      index: end,
    });

    heapify(sortingArray, end, 0, animations);
  }

  animations.push({
    type: "sorted",
    index: 0,
  });

  return animations;
};
