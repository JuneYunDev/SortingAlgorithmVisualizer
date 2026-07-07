export const insertionSort = (array) => {
  const sortingArray = [...array];

  for (let i = 1; i < sortingArray.length; i++) {
    const temp = sortingArray[i];
    let j = i - 1;

    while (j >= 0 && sortingArray[j].value > temp.value) {
      sortingArray[j + 1] = sortingArray[j];
      j--;
    }
    sortingArray[j + 1] = temp;
  }
  return sortingArray;
};
