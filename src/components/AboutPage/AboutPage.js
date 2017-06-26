import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

export default class About extends Component {

render() {
    return (

<section className="about-body">

    <div className="about-solidBG">
        <div className="about-solidBG-HR"></div>
        <div className="about-solidBG-container">
            <div className="about-img-container">
                <div className="about-technology">TECHNOLOGY</div>
                <div className="about-pic1"></div>         
            </div>
        </div>
    </div>

    <div className="about-parallax">
        <div className="about-parallax-gradient">
            <div className="about-img-container">
                <div className="about-pic2"></div>
            </div> 
        </div>       
    </div>

    <div className="about-solidBG">
        <div className="about-solidBG-HR"></div>
        <div className="about-solidBG-container">
            <div className="about-img-container">
                <div className="about-technology">DEVELOPERS</div>
                <div className="about-pic3"></div>         
            </div>
        </div>
    </div>


</section>

)}}