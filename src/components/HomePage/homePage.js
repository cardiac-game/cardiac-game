import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; // Important for linking to the Health page at bottom of homepage

import './homePage.css';

export default class HomePage extends Component {

// bloody(){

// let canvas = document.querySelector("#bloody")

// canvas.width = 500;
// canvas.height = 500;
// let ctx = this.refs.canvas.getContext('2d');
// ctx.fillStyle = "black";
// ctx.fillRect(0,0,100,100);
// ctx.stroke()


// }

render() {
    return (

<section className="home-body">

<div className="title">CARDIAC</div>
<div className="dark-curtain"></div>
<div className="light-curtain"></div>
{/*<canvas id="bloody"onLoad={ this.bloody }></canvas>*/}

<div className="text-back">
<div className="text">WELCOME TO CARDIAC
<hr></hr>
We’ve used proven nutritional data and correlated this with the phenomenon that is the human body to bring you the ultimate immune system simulator.
<br></br><br></br>
Cardiac raises awareness and educates in the form of a fun and informative video game. A game that only proves its point the more challenging it gets.
<br></br><br></br>
Take command of your immune system, and fight the battle your body fights every single day.
</div>
</div>

<div className="image-one"></div>

</section>

)}}