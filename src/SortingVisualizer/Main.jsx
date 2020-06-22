import React, { Component } from "react";
import PropTypes from "prop-types";
import SortingVisualizer from "./SortingVisualizer";
import Controls from "./Controls";

var numberOfBars = 10;

var algo = 0;

class Main extends Component {

    parentFunction = (data_from_child) => {
        algo = data_from_child;
        const sV = this.refs.child;

        switch (data_from_child) {
            case 0:
                sV.resetArray();
                break;
            case 1:
                sV.mergeSort();
                break;
            case 2:
                sV.quickSort();
                break;
            case 3:
                sV.heapSort();
                break;
            case 4:
                sV.combSort();
                break;
            case 5:
                sV.bubbleSort();
                break;
            case 6:
                sV.insertionSort();
                break;
            case 7:
                sV.selectionSort();
                break;
            default:
                break;
        }
    }

    updateBars = () => {
        this.refs.child.setNumberOfBars();
    }

    animationFinished = () => {
        this.refs.controlChild.enableUI();
    }

    render() {
        return (
            <div>
                <Controls ref="controlChild" functionCallFromParent={this.parentFunction.bind(this)} updateBars={this.updateBars.bind(this)}></Controls>
                <SortingVisualizer ref="child" animationFinished={this.animationFinished.bind(this)} newAlg={algo}></SortingVisualizer>
            </div>
        );
    }
}

export default Main;