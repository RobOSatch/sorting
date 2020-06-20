export function getBubbleSortAnimations(array) {
    const animations = [];
    
    for (let n = array.length; n > 1; --n) {
        for (let i = 0; i < n - 1; ++i) {
            const animation = {};
            animation.comparison = [i, i + 1];
            if (array[i] > array[i + 1]) {
                animation.swap = true;
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }

            animations.push(animation);
        }
    }

    return animations;
}

export function getQuickSortAnimations(array) {
    const animations = [];

    quicksort(array, 0, array.length - 1, animations);

    return animations;
}

export function getInsertionSortAnimations(array) {
  const animations = [];

  let i = 1;

  while (i < array.length) {
    let j = i;

    while (j > 0 && array[j - 1] > array[j]) {
      animations.push({
        comparison: [j - 1, j],
        swap: true,
      });

      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }

    i++;
  }

  return animations;
}

export function getDSelectionSortAnimations(array) {
  const animations = [];

  var lo = 0;
  var hi = array.length - 1;

  while (lo <= hi) {
    let min = array[lo];
    let max = array[hi];
    let minIdx = lo;
    let maxIdx = hi;

    for (let i = lo; i < hi; ++i) {
      if (array[i] < min) {
        animations.push({
          comparison: [i, minIdx],
          swap: false,
        });

        min = array[i];
        minIdx = i;
      }
    }

    animations.push({
      comparison: [minIdx, lo],
      swap: true,
    })

    const temp = array[minIdx];
    array[minIdx] = array[lo];
    array[lo] = temp;

    lo++;

    for (let i = lo; i < hi; ++i) {
      if (array[i] > max) {
        animations.push({
          comparison: [i, maxIdx],
          swap: false,
        });

        max = array[i];
        maxIdx = i;
      }
    }

    animations.push({
      comparison: [maxIdx, hi],
      swap: true,
    })

    const temp2 = array[maxIdx];
    array[maxIdx] = array[hi];
    array[hi] = temp2;

    hi--;
  }

  return animations;
}

export function doubleSelectionSort(array) {
  let lo = 0;
  let hi = array.length - 1;

  while (lo < hi) {
    let min = array[lo];
    let max = array[hi];
    let minIdx = lo;
    let maxIdx = hi;

    for (let i = lo; i < hi; ++i) {
      if (array[i] < min) {

        min = array[i];
        minIdx = i;
      }
    }

    const temp = array[minIdx];
    array[minIdx] = array[lo];
    array[lo] = temp;

    lo++;

    for (let i = lo; i < hi; ++i) {
      if (array[i] > max) {
        max = array[i];
        maxIdx = i;
      }
    }

    const temp2 = array[maxIdx];
    array[maxIdx] = array[hi];
    array[hi] = temp2;

    hi--;
  }

  return array;
}

function insertionSort(array) {
  let i = 1;

  while (i < array.length) {
    let j = i;

    while (j > 0 && array[j - 1] > array[j]) {
      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }

    i++;
  }

  return array;
}

function quicksort(array, lo, hi, animations) {
    if (lo < hi) {
        const p = partition(array, lo, hi, animations);
        quicksort(array, lo, p - 1, animations);
        quicksort(array, p + 1, hi, animations);
    }
}

function partition(array, lo, hi, animations) {
    const pivotIdx = hi
    const pivot = array[pivotIdx];
    let i = lo;

    for (let j = lo; j < hi; ++j) {
        const animation = {};
        animation.comparison = [i, j];
        animation.pivot = pivotIdx;

        if (array[j] < pivot) {
            animation.swap = true;
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            ++i;
        }

        animations.push(animation);
    }
    
    const temp = array[i];
    array[i] = array[hi];
    array[hi] = temp;

    const animation = {};
    animation.comparison = [i, hi];
    animation.swap = true;
    animation.pivot = pivotIdx;
    animations.push(animation);

    return i;
}

export function bubbleSort(array) {
    for (let n = array.length; n > 1; --n) {
        for (let i = 0; i < n - 1; ++i) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }
    }

    return array;
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }