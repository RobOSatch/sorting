export function getHeapSortAnimations(array) {
	const animations = [];

	let length = array.length;
	let i = Math.floor(length / 2 - 1);
	let k = length - 1;

	while (i >= 0) {
		heapify(array, length, i, animations);
		i--;
	}

	while (k >= 0) {
		const temp = array[0];
		array[0] = array[k];
		array[k] = temp;

		animations.push({
			comparison: [0, k],
			swap: true
		});

		animations.push({
			comparison: [0, k],
			swap: false,
			sorted: [k]
		});

		heapify(array, k, 0, animations);
		k--;
	}

	return animations;
}

function heapify(array, length, i, animations) {
	let largest = i;
	let left = i * 2 + 1;
	let right = left + 1;
	
	if (left < length && array[left] > array[largest]) {
		largest = left;
	}

	if (right < length && array[right] > array[largest]) {
		largest = right;
	}

	if (largest != i) {
		const temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		animations.push({
			comparison: [i, largest],
			swap: true
		});

		heapify(array, length, largest, animations);
	}

	return array;
}

export function getCombSortAnimations(array) {
	const animations = [];

	var gap = array.length
	const shrink = 1.3;
	var finished = false;

	while (finished == false) {
		gap = Math.floor(gap / shrink);

		if (gap <= 1) {
			gap = 1;
			finished = true;
		}

		var i = 0;
		while (i + gap < array.length) {
			const animation = {};
			animation.comparison = [i, i + gap];

			if (array[i] > array[i + gap]) {
				animation.swap = true;
				const temp = array[i];
				array[i] = array[i + gap];
				array[i + gap] = temp;
				finished = false;
			}

			animations.push(animation);

			i++;
		}
	}

	const sorted = [];
	for (let i = 0; i < array.length; ++i) {
		sorted.push(i);
	}

	animations.push({
		comparison: [0, 0],
		swap: false,
		sorted: sorted
	});

	return animations;
}

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

		animations.push({
			comparison: [n - 1, n - 1],
			swap: false,
			sorted: [n - 1]
		})
	}

	animations.push({
		comparison: [0, 0],
		swap: false,
		sorted: [0]
	})

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

	const sorted = [];
	for (let i = 0; i < array.length; ++i) {
		sorted.push(i);
	}

	animations.push({
		comparison: [0, 0],
		swap: false,
		sorted: sorted
	});

	return animations;
}

export function getSelectionSortAnimations(array) {
	const animations = [];

	var lo = 0;

	while (lo < array.length) {
		let min = array[lo];
		let minIdx = lo;

		for (let i = lo; i < array.length; ++i) {
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
			swap: true
		})

		animations.push({
			comparison: [minIdx, lo],
			swap: false,
			sorted: [lo]
		})

		const temp = array[minIdx];
		array[minIdx] = array[lo];
		array[lo] = temp;

		lo++;
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
		var sorted = [p];
		if (p - 1 >= lo) sorted.push(p - 1);
		animations.push({
			comparison: [p, p],
			swap: false,
			pivot: p,
			sorted: sorted
		});

		quicksort(array, p + 1, hi, animations);
		sorted = [p];
		if (p + 1 <= hi) sorted.push(p + 1)

		animations.push({
			comparison: [p, p],
			swap: false,
			pivot: p,
			sorted: sorted
		})
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

	animations.push({
		comparison: [i, i],
		swap: false,
		pivot: pivotIdx,
		sorted: [i]
	})

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

	const sorted = [];
	for (let i = 0; i < array.length; ++i) {
		sorted.push(i);
	}

	animations.push({
		comparison: [0, 0],
		swap: false,
		sorted: sorted
	});

	return animations;
}

function mergeSortHelper(
	mainArray,
	startIdx,
	endIdx,
	auxiliaryArray,
	animations
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
	lastMerge
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