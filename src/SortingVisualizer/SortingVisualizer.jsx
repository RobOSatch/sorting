import React from 'react';
import {
	getMergeSortAnimations,
	getBubbleSortAnimations,
	getQuickSortAnimations,
	getInsertionSortAnimations,
	getDSelectionSortAnimations,
	doubleSelectionSort,
} from '../Algorithms/algorithms.js';
import './SortingVisualizer.css';
import { render } from '@testing-library/react';

var numberOfBars = 100;

var animationDuration = 1000;
var animationSpeed = animationDuration / numberOfBars;

var isRunning = false;

var timeouts = [];

// Margin constants
const INNER_BAR_MARGIN = 2;
const OUTER_MARGIN = 75;

// Color of bars
const PRIMARY_COLOR = 'lightskyblue';

// Color of compared bars
const SECONDARY_COLOR = 'lightcoral';

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			dimensions: [],
		};
	}

	componentDidMount() {
		this.state.dimensions = [window.innerWidth, window.innerHeight];
		this.resetArray();
	}

	resetArray() {
		this.isRunning = false;

		for (let timeout of timeouts) {
			clearTimeout(timeout);
		}

		for (let arrayBar of document.getElementsByClassName('array-bar')) {
			arrayBar.style.backgroundColor = PRIMARY_COLOR;
		}

		const dimensions = [window.innerWidth, window.innerHeight];
		const array = [];
		const randomIdx = randomIntFromInterval(0, numberOfBars);

		for (let i = 0; i < numberOfBars - 1; i++) {
			if (i === randomIdx) {
				if (!array.includes(dimensions[1] - 400)) {
					array.push(dimensions[1] - 400);
				}
			}
			array.push(randomIntFromInterval(5, dimensions[1] - 400));
		}

		this.setState({ array, dimensions });
	}

	mergeSort() {
		if (isRunning) {
			isRunning = false;
			this.resetArray();
		} else {
			isRunning = true;

			const animations = getMergeSortAnimations(this.state.array);
			for (let i = 0; i < animations.length; i++) {
				const arrayBars = document.getElementsByClassName('array-bar');
				const isColorChange = i % 3 !== 2;
				if (isColorChange) {
					const [barOneIdx, barTwoIdx] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					const barTwoStyle = arrayBars[barTwoIdx].style;
					const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
					timeouts.push(setTimeout(() => {
						barOneStyle.backgroundColor = color;
						barTwoStyle.backgroundColor = color;
					}, i * animationSpeed));
				} else {
					timeouts.push(setTimeout(() => {
						const [barOneIdx, newHeight] = animations[i];
						const barOneStyle = arrayBars[barOneIdx].style;
						barOneStyle.height = `${newHeight}px`;
					}, i * animationSpeed));
				}
			}
		}
	}

	quickSort() {
		if (isRunning) {
			isRunning = false;
			this.resetArray();
		} else {
			isRunning = true;
			const animations = getQuickSortAnimations(this.state.array);

			for (let i = 0; i < animations.length; ++i) {
				const arrayBars = document.getElementsByClassName('array-bar');
				const isColorChange = i % 3 !== 2;

				const [barOneIdx, barTwoIdx] = animations[i].comparison;
				const pivotIdx = animations[i].pivot;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const pivotStyle = arrayBars[pivotIdx].style;

				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

				timeouts.push(setTimeout(() => {
					pivotStyle.backgroundColor = 'limegreen';
					barOneStyle.backgroundColor = SECONDARY_COLOR;
					barTwoStyle.backgroundColor = SECONDARY_COLOR;

				}, i * animationSpeed));

				timeouts.push(setTimeout(() => {
					pivotStyle.backgroundColor = PRIMARY_COLOR;
					barOneStyle.backgroundColor = PRIMARY_COLOR;
					barTwoStyle.backgroundColor = PRIMARY_COLOR;
				}, i * animationSpeed + animationSpeed * 0.7));
				const shouldSwap = animations[i].swap;

				if (shouldSwap) {
					const [barOneIdx, barTwoIdx] = animations[i].comparison;
					const barOneStyle = arrayBars[barOneIdx].style;
					const barTwoStyle = arrayBars[barTwoIdx].style;

					timeouts.push(setTimeout(() => {
						const tempHeight = barOneStyle.height;
						barOneStyle.height = barTwoStyle.height;
						barTwoStyle.height = tempHeight;
					}, i * animationSpeed));
				}
			}
		}
	}

	heapSort() {
		this.test();
	}

	insertionSort() {
		if (isRunning) {
			isRunning = false;
			this.resetArray();
		} else {
			isRunning = true;
			this.executeAnimations(getInsertionSortAnimations(this.state.array));
		}
	}

	doubleSelectionSort() {
		if (isRunning) {
			isRunning = false;
			this.resetArray();
		} else {
			isRunning = true;
			this.executeAnimations(getDSelectionSortAnimations(this.state.array));
		}
	}

	bubbleSort() {
		if (isRunning) {
			isRunning = false;
			this.resetArray();
		} else {
			isRunning = true;
			this.executeAnimations(getBubbleSortAnimations(this.state.array));
		}
	}

	test() {
		const sorted = doubleSelectionSort(doubleSelectionSort(this.state.array));
		const jsSorted = this.state.array.slice().sort((a, b) => a - b);

		console.log(arraysAreEqual(sorted, jsSorted));
	}

	executeAnimations(animations) {
		for (let i = 0; i < animations.length; ++i) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;

			const [barOneIdx, barTwoIdx] = animations[i].comparison;
			const barOneStyle = arrayBars[barOneIdx].style;
			const barTwoStyle = arrayBars[barTwoIdx].style;

			const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

			timeouts.push(setTimeout(() => {
				barOneStyle.backgroundColor = SECONDARY_COLOR;
				barTwoStyle.backgroundColor = SECONDARY_COLOR;
			}, i * animationSpeed));

			timeouts.push(setTimeout(() => {
				barOneStyle.backgroundColor = PRIMARY_COLOR;
				barTwoStyle.backgroundColor = PRIMARY_COLOR;
			}, i * animationSpeed + animationSpeed * 0.7));

			const shouldSwap = animations[i].swap;

			if (shouldSwap) {
				const [barOneIdx, barTwoIdx] = animations[i].comparison;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				timeouts.push(setTimeout(() => {
					const tempHeight = barOneStyle.height;
					barOneStyle.height = barTwoStyle.height;
					barTwoStyle.height = tempHeight;

					if (this.isAnimationFinished()) {
						isRunning = false;
					}
				}, i * animationSpeed));
			}
		}
	}

	isAnimationFinished() {
		const arrayBars = document.getElementsByClassName("array-bar");
		for (let i = 0; i < this.state.array.length; ++i) {
			if (arrayBars[i].style.height.value !== this.state.array[i]) {
				return false;
			}
		}

		return true;
	}

	reRender() {
		this.setState(this.state);
	}

	stopAnimations() {
		//
	}

	/**
	 * Slider functions
	 */
	setNumberOfBars() {
		var slider = document.getElementById("numberOfBars");
		numberOfBars = slider.value;
		animationSpeed = animationDuration / numberOfBars;
		this.resetArray();
	}

	render() {
		const { array } = this.state;
		const dimensions = this.state.dimensions;

		return (
			<div className="body">
				<div className="controls">
					<button onClick={() => this.resetArray()} className="randomizeBtn">Randomize</button>
					<button onClick={() => this.mergeSort()} id="mergesortBtn">MergeSort</button>
					<button onClick={() => this.quickSort()} id="quicksortBtn">QuickSort</button>
					<button onClick={() => this.heapSort()} id="heapsortBtn">Heap Sort</button>
					<button onClick={() => this.bubbleSort()} id="bubblesortBtn">BubbleSort</button>
					<button onClick={() => this.insertionSort()} id="insertionsortBtn">InsertionSort</button>
					<button onClick={() => this.doubleSelectionSort()}>Double SelectionSort</button>
					<br />
					<p>Number of bars: {numberOfBars}</p>
					<input type="range" min="10" max="300" value={numberOfBars} className="slider" id="numberOfBars" onChange={() => this.setNumberOfBars()} />
					<br />
				</div>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: PRIMARY_COLOR,
								height: `${value}px`,
								width: `${dimensions[0] / numberOfBars - 2 * INNER_BAR_MARGIN - 2 * OUTER_MARGIN / numberOfBars}px`,
							}}></div>
					))}
				</div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) {
			return false;
		}
	}
	return true;
}