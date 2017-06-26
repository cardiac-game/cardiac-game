import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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


{/*SECTION ONE*/}
<div className="section-1">
<div className="title">CARDIAC</div>
{/*<div className="test"></div>*/}
<div className="dark-curtain-1"></div>
<canvas ref="bloody"></canvas>
</div>


{/*SECTION TWO*/}
<div className="section-2">
<div className="text-back-1">
<div className="text">WELCOME TO CARDIAC
<hr/>
We’ve used proven nutritional data and correlated this with the phenomenon that is the human body to bring you the ultimate immune system simulator.
<br/><br/>
Cardiac raises awareness and educates in the form of a fun and informative video game. A game that only proves its point the more challenging it gets.
<br/><br/>
Take command of your immune system, and fight the battle your body fights every single day.
</div>
</div>
<div className="image-one"></div>
</div>


{/*SECTION THREE*/}
<div className="section-3">
<div className="text-back-2">

<div className="quote">"This website changed my life. I'm new to the internet, but this is the only reason I ever go on. It warms my heart to see young people these days care so much about their health.
    <br/><br/>As someone with a lot of life experience, I endorse this website as a good source of motivation."
<br/><br/><hr/>
</div>

    <div className="pic-one anatomy-pic">
        <Link to="/timeline"><div className="button-1">TIMELINE</div></Link>
    </div>
    
    <div className="pic-two anatomy-pic">
        <Link to="/healthy"><div className="button-2">NUTRITION</div></Link>
    </div>
    
    <div className="pic-three anatomy-pic">
        <Link to="/about"><div className="button-3">ABOUT</div></Link>
    </div>

<div className="dark-curtain-2"></div>
</div>

<div className="image-two">
    <div className="continue">CONTINUE</div>
    <Link to="/input"><div className="continue">CONTINUE</div></Link>
</div>


<div className="home-filler">
    <div className="quote">"This website has changed my soul.
        <br></br><br></br>I'm not new to health, and so I know how bad looking other health websites look. This one is beautiful. I've bookmarked, favorited and made this website my homepage.
        <br></br><br></br>You can trust me. I'm a professional and finding websites like this helps keep the pounds off." - Dr. El-ix
<br></br><br></br><hr/>
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
<div className="footer-source5">· USDA API</div>


<div className="footer-about foot-toes">ABOUT</div>
<Link to="/about"><div className="footer-about1">· Developers</div></Link>
<Link to="/about"><div className="footer-about2">· Technology</div></Link>

<div className="footer-contact foot-toes">CONTACT</div>
</div>

</div>

</section>

)}}