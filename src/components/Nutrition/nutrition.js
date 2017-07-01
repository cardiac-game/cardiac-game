import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nutrition.css';

export default class Nutrition extends Component {

    constructor() {
        super()

        this.state = {
            row1: 0,
            row2: 1,
            row3: 0,
            row4: 0,
        
        }
    }
    
    row1 = function() {
        const arr = Array.apply(null, Array(this.state.row1)).map(Number.prototype.valueOf,0);

        return (
            <div className="row" onClick={() => this.splitCell("row1")}>
                {arr.map((cv, i) => <div key={i} className="cell-box"></div>)}
            </div>            
        )
    }

    row2 = function() {
        const arr = Array.apply(null, Array(this.state.row2)).map(Number.prototype.valueOf,0);

        return (
            <div className="row" onClick={() => this.splitCell("row2")}>
                {arr.map((cv, i) => <div key={i} className="cell-box"></div>)}
            </div>            
        )
    }
    
    row3 = function() {
        const arr = Array.apply(null, Array(this.state.row3)).map(Number.prototype.valueOf,0);

        return (
            <div className="row" onClick={() => this.splitCell("row3")}>
                {arr.map((cv, i) => <div key={i} className="cell-box"></div>)}
            </div>            
        )
    }

    row4 = function() {
        const arr = Array.apply(null, Array(this.state.row4)).map(Number.prototype.valueOf,0);

        return (
            <div className="row" onClick={() => this.splitCell("row4")}>
                {arr.map((cv, i) => <div key={i} className="cell-box"></div>)}
            </div>            
        )
    }
    splitCell = function(rowNum) {
        if (rowNum === "row4" && this.state.row3 < 1){
            this.setState({
                row3: 1
            })
            return
        }

        if (this.state[rowNum] < 12){
            this.setState({
                [rowNum]: this.state[rowNum]+1
            })
        }
        return
    }

    render() {
        return (

        <section className="nutrition-body">
            <div className="nutri-row-container">
                { this.row1() }
                { this.row2() }
                { this.row3() }
                { this.row4() }
            </div>
        </section>
        )
    }
}