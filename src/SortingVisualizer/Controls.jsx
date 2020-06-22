import React, { Component } from "react";
import PropTypes from "prop-types";

class Controls extends Component {
    constructor(props) {
		super(props);

		this.state = {
            numBars: 100,
            enabled: [true, true, true, true, true, true, true, true, true],
            sliderEnabled: true
		};
	}

    childFunction=(algo)=>{
        this.props.functionCallFromParent(algo);

        const algoButtons = document.getElementsByClassName("algoBtn");
        var enabled = [];
        const numBars = this.state.numBars;

        var sliderEnabled = false;

        if (algo !== 0) {
            if (!this.state.enabled[0]) {
                for (let i = 0; i < this.state.enabled.length; ++i) {
                    enabled[i] = true;
                    algoButtons[algo - 1].id = "none";
                }
                sliderEnabled = true;
            } else {
                for (let i = 0; i < this.state.enabled.length; ++i) {
                    enabled[i] = false;
                }
    
                enabled[algo] = true;
                algoButtons[algo - 1].id = "playing";
            }
    
            this.setState({numBars, enabled, sliderEnabled });
        }
    }

    enableUI() {
        const buttons = document.getElementsByClassName("algoBtn");

        const enabled = [true];

        for (let i = 0; i < buttons.length; ++i) {
            enabled.push(true);
            buttons[i].id = "none";
        }

        const numBars = this.state.numBars;

        this.setState({ numBars, enabled, sliderEnabled: true });
    }

    updateBars = () => {
        this.props.updateBars();
    }

    setNumBars() {
		var slider = document.getElementById("numberOfBars");
		const numBars = slider.value;
        //this.resetArray();
        this.setState({ numBars });
        this.updateBars();
	}

    render() {
        return (
        <div className="controls">
					<button onClick={() => this.childFunction(0)} className="randomizeBtn" disabled={!this.state.enabled[0]}>Randomize</button>
					<button onClick={() => this.childFunction(1)} className="algoBtn" id="mergesortBtn" disabled={!this.state.enabled[1]}>MergeSort</button>
					<button onClick={() => this.childFunction(2)} className="algoBtn" id="quicksortBtn" disabled={!this.state.enabled[2]}>QuickSort</button>
                    <button onClick={() => this.childFunction(3)} className="algoBtn" id="insertionsortBtn" disabled={!this.state.enabled[3]}>HeapSort</button>
					<button onClick={() => this.childFunction(4)} className="algoBtn" id="combSortBtn" disabled={!this.state.enabled[4]}>CombSort</button>
					<button onClick={() => this.childFunction(5)} className="algoBtn" id="bubblesortBtn" disabled={!this.state.enabled[5]}>BubbleSort</button>
					<button onClick={() => this.childFunction(6)} className="algoBtn" id="insertionsortBtn" disabled={!this.state.enabled[6]}>InsertionSort</button>
					<button onClick={() => this.childFunction(7)} className="algoBtn" disabled={!this.state.enabled[7]}>SelectionSort</button>
					<br />
                    <p>Number of bars: {this.state.numBars}</p>
					<input type="range" min="10" max="300" value={this.state.numBars} disabled={!this.state.sliderEnabled} className="slider" id="numberOfBars" onChange={() => this.setNumBars()} />
				</div>
        );
    }
}

export default Controls;