# Sorting Algorithm Visualizer
In high school I did some research on sorting algorithms and built some of them in Java. 7 years later I decided to revisit this topic with my improved skills and in a more visual manner. I think it's really fascinating how every algorithm has its own pattern, almost like a personality. [Check out my webapp and try it out for yourself](https://robosatch.github.io/sorting).

## MergeSort
### O(nlogn)
This algorithm works with the classic divide-and-conquer strategy. It divides the array into two subarrays, and continues doing that recursively, until it is left with single values. Then, it sorts those, by merging two arrays at a time.

## QuickSort
### O(nlogn)
This algorithm takes a pivot element and sorts the array in a way, that all elements left of the pivot are smaller than the pivot, while all elements right of the pivot are greater. This means that the pivot is now sorted. This is done recursively for each side until the array is sorted.

## HeapSort
### O(nlogn)
HeapSort takes the array and structures it like a heap (a tree, where the min or max value is the root). It then takes the root of that heap and places it at the appropriate position in the array (last position 

## BubbleSort
### O(n^2)
BubbleSort compares two adjacent values and swaps them if they are in the incorrect order. This means that after one iteration, the largest value is the last element of the array (bubbling it up). This is then repeated for all of the n values.

## CombSort
### O(n^2)
This algorithm essentially works the same way as BubbleSort, but with a small catch. It does not only compare adjacent values, but rather defines a specific gap size which is used to get better comparisons than regular BubbleSort would.

## InsertionSort
### O(n^2)
This algorithm keeps one part of the array, which is sorted and iterates through the other "unsorted" part. In the beginning, only the first value is sorted. Then it takes the second value and inserts it at the correct position. InsertionSort repeats that for every value until we have a sorted array.

## SelectionSort
### O(n^2)
SelectionSort "selects" the maximum (or minimum) of the entire array (this is done in linear time) and then swaps it with the last (max) or first (min) value. This value is never touched again and instead, the rest of the array goes through the same process again. This is repeated until the entire array is sorted.
