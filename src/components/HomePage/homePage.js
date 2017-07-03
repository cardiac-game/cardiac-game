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
Diet and exercise play a crucial role in the longevity and quality of life. Our bodies are constantly fighting to keep us alive using only the resources we consume and the infrastructure built by exercise.
<br/><br/>
Cardiac uses a fun and interactive video game to emphasize the importance of a healthy diet and active lifestyle. A game that only proves its point the more challenging it gets.
<br/><br/>
Take command of your immune system, and fight the battle your body fights every single day.
</div>
</div>
<div className="image-one"></div>
</div>


{/*SECTION THREE*/}
<div className="section-3">
<div className="text-back-2">

<div className="quote">"Nutrition is so important. It can't be stressed enough." - Dwayne Johnson
    <br></br><br></br>
    "Developing a diet that is healthful, balanced, and appropriate for your particular caloric needs is easy enough and is absolutely critical to establishing a healthful lifestyle that incorporates proper nutrition, adequate fitness, and mental resilience."<br/>- Daphne Oz <br/><br/><hr/>
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
    <div className="quote">"In our fast-forward culture, we have lost the art of eating well.
        <br></br><br></br>
        Food is often little more than fuel to pour down the hatch while doing other stuff - surfing the Web, driving, walking along the street. Dining al desko is now the norm in many workplaces. All of this speed takes a toll.
        <br></br><br></br>
        Obesity, eating disorders and poor nutrition are rife." - Carl Honore
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
<Link to="/about"><div className="footer-about1">· Technology</div></Link>
<Link to="/about"><div className="footer-about2">· Developers</div></Link>

<div className="footer-contact foot-toes">CONTACT</div>
</div>

</div>

</section>

)}}