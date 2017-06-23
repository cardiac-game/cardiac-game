import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; // Important for linking to the Health page at bottom of homepage
import bloody from './bloody.js';
import anatomy from './anatomy.js';
import './homePage.css';

export default class HomePage extends Component {

componentDidMount(){
    bloody(this.refs.bloody);
}

render() {
    return (

<section className="home-body">

<div className="title">CARDIAC</div>
<div className="dark-curtain-1"></div>
<canvas ref="bloody"></canvas>

<div className="text-back-1">
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

<div className="text-back-2">

<div className="quote">"This website changed my life. I'm new to the internet, but this is the only reason I ever go on. It warms my heart to see young people these days care so much about their health.
    <br></br><br></br>As someone with a lot of life experience, I endorse this website as a good source of motivation. Some days are harder to get out of bed than others because of my osteoperosis, but this website alone has helped me push through the pain.
    <br></br><br></br>Sign up and play today."  - Mentor, Alex - 100 years from now (Yes, I'll still be alive).
<br></br><br></br><br></br><hr></hr>
</div>

    <div className="pic-one anatomy-pic">
        <div className="button-1">TIMELINE</div>
    </div>
    
    <div className="pic-two anatomy-pic">
        <div className="button-2">NUTRITION</div>
    </div>
    
    <div className="pic-three anatomy-pic">
        <div className="button-3">ABOUT</div>
    </div>

<div className="dark-curtain-2"></div>

</div>


<div className="image-two">
    <div className="continue">CONTINUE</div>
</div>


<div className="home-filler">
    <div className="quote">"This website changed my life. I'm new to the h about their health.
    <br></br><br></br>As someone with a lot of life experience, I endorse this website as a good source of motivation. Some days are harder to get out of bed than others because of my osteoperosis.
    <br></br><br></br>As someone with a lot of life experience, I endorse this website as a good source of motivation."
<br></br><br></br><br></br><hr></hr>
</div>
</div>
<div className="home-footer">
<div className="dark-curtain-3"></div>
<div className="footer-cardiac">CARDIAC</div>
<div className="footer-line"></div>

<div className="footer-vision foot-toes">VISION</div>

<div className="footer-sources foot-toes">SOURCES</div>
<div className="footer-source1">· CDC</div>
<div className="footer-source2">· Live Strong</div>
<div className="footer-source3">· NCI</div>
<div className="footer-source4">· PBS</div>

<div className="footer-about foot-toes">ABOUT</div>
<div className="footer-about1">· Developers</div>
<div className="footer-about2">· Technology</div>

<div className="footer-contact foot-toes">CONTACT</div>
</div>

</section>

)}}