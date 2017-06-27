import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

import reactLogo from './images/react_logo.png';
import HTMLLogo from './images/HTML5_logo.png';
import nodeLogo from './images/nodejs_logo.png';
import expressLogo from './images/express_logo.png';
import postgresLogo from './images/postgresql_logo.png';
import herokuLogo from './images/heroku_postgres.png';
import USDALogo from './images/USDA_logo.png';

import ericPortrait from './images/Eric.jpg';
import juniorPortrait from './images/Ivor.jpg';
import nickPortrait from './images/Nicholas.jpg';
import justicePortrait from './images/Justice.jpg'
import jessePortrait from './images/Jesse.jpg';



export default class About extends Component {

    constructor() {
        super()

        this.state = {
            selectedPortrait: 1
        }
    }

    onPortraitClick(portraitNumber) {
        this.setState(Object.assign({}, {selectedPortrait: portraitNumber}));
    }

    render() {



        return (

            <section className="about-body">

                <div className="about-solidBG">
                    <div className="about-solidBG-HR"></div>
                    <div className="about-solidBG-container">
                        <div className="about-img-container">
                            <div className="about-headers">TECHNOLOGY</div>
                            <div className="about-pic1"></div>         
                        </div>
                        <div className="about-solidBG-content">
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={reactLogo} alt="react logo"/>
                                </div>
                                <div className="about-logo-info">
                                    REACT
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={HTMLLogo} alt="HTML5 logo"/>
                                </div>
                                <div className="about-logo-info">
                                    HTML
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={nodeLogo} alt="nodejs logo"/>
                                </div>
                                <div className="about-logo-info">
                                    NODE
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-express" src={expressLogo} alt="express logo"/>
                                </div>
                                <div className="about-logo-info">
                                    EXPRESS
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={postgresLogo} alt="postgreSQL logo"/>
                                </div>
                                <div className="about-logo-info">
                                    POSTGRESQL
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={herokuLogo} alt="heroku logo"/>
                                </div>
                                <div className="about-logo-info">
                                    HEROKU
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-parallax">
                    <div className="about-parallax-gradient">
                        <div className="about-img-container">
                            <div className="about-pic2"></div>
                        </div> 
                        <div className="about-para-content">
                            <p className="about-para-content-p">"To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear."</p>
                            <p className="about-para-content-p">- Buddha</p>
                        </div>
                    </div>       
                </div>

                <div className="about-solidBG">
                    <div className="about-solidBG-HR"></div>
                    <div className="about-solidBG-container">
                        <div className="about-img-container">
                            <div className="about-headers">DEVELOPERS</div>
                            <div className="about-pic3"></div>         
                        </div>
                        <div className="about-solidBG-content">
                            <div className="portrait-container">
                                <div className="portrait">
                                    <div className="portrait-img-container">
                                        <img 
                                            onClick={() => this.onPortraitClick(1)} 
                                            className={"portrait-img " + (this.state.selectedPortrait !== 1 ? 'portrait-gs' : 'portrait-no-gs')}
                                            src={ericPortrait} 
                                            alt="Eric Patterson"/>
                                    </div>   
                                </div>
                                <div className="portrait">
                                    <div className="portrait-img-container">
                                        <img 
                                            onClick={() => this.onPortraitClick(2)} 
                                            className={"portrait-img " + (this.state.selectedPortrait !== 2 ? 'portrait-gs' : 'portrait-no-gs')}
                                            src={juniorPortrait} 
                                            alt="Ivor Anderson Jr."/>
                                    </div>   
                                </div>
                                <div className="portrait">
                                    <div className="portrait-img-container">
                                        <img 
                                            onClick={() => this.onPortraitClick(3)} 
                                            className={"portrait-img " + (this.state.selectedPortrait !== 3 ? 'portrait-gs' : 'portrait-no-gs')}
                                            src={jessePortrait} 
                                            alt="Jesse Tenney"/>
                                    </div>
                                    
                                </div>
                                <div className="portrait">
                                    <div className="portrait-img-container">
                                        <img 
                                            onClick={() => this.onPortraitClick(4)} 
                                            className={"portrait-img " + (this.state.selectedPortrait !== 4 ? 'portrait-gs' : 'portrait-no-gs')} 
                                            src={justicePortrait} 
                                            alt="Justice Perez White"/>
                                    </div>
                                    
                                </div>
                                <div className="portrait">
                                    <div className="portrait-img-container">
                                        <img 
                                            onClick={() => this.onPortraitClick(5)} 
                                            className={"portrait-img " + (this.state.selectedPortrait !== 5 ? 'portrait-gs' : 'portrait-no-gs')} 
                                            src={nickPortrait} 
                                            alt="Nicholas Mueller"/>
                                    </div> 
                                </div>                
                            </div>
                            <div className="portrait-text-container-row">
                                <div className="portrait-text-container">
                                    <div className="portrait-name-container">Eric Patterson</div>
                                    <div className="portrait-role-container">Game Developer</div>
                                </div>
                                <div className="portrait-text-container">
                                    <div className="portrait-name-container">Ivor Anderson</div>
                                    <div className="portrait-role-container">Frontend Developer and Designer</div>
                                </div>
                                <div className="portrait-text-container">
                                    <div className="portrait-name-container">Jesse Tenney</div>
                                    <div className="portrait-role-container">Backend Developer</div>
                                </div>
                                <div className="portrait-text-container">
                                    <div className="portrait-name-container">Justice Perez White</div>
                                    <div className="portrait-role-container">Fullstack Developer</div>
                                </div>
                                <div className="portrait-text-container">
                                    <div className="portrait-name-container">Nicholas Mueller</div>
                                    <div className="portrait-role-container">Frontend Developer and Researcher</div>
                                </div>
                            </div>
                            <div className="about-spacer">
                                <hr/>
                            </div>
                            <div className="portrait-info">
                                <div className={(this.state.selectedPortrait === 1 ? "display-block" : "display-none")}> 
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/eric-patterson-00477966/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/erpatterson11"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Game Developer in charge of
                                        </p>
                                        <p>
                                            <span className="bold">Background: </span>
                                            West Philadelphia born and raised
                                        </p>                             
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 2 ? "display-block" : "display-none")}> 
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/ivor-anderson-824011b7/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/elderandi"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Frontend Developer and Designer
                                        </p>
                                        <p>
                                            <span className="bold">Background: </span>
                                            New Zealand born and raised
                                        </p>                             
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 3 ? "display-block" : "display-none")}> 
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/jesse-tenney-5a0969139/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/jesse10e"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Backend Developer
                                        </p>
                                        <p>
                                            <span className="bold">Background: </span>
                                            From California or something
                                        </p>                             
                                    </div>  
                                </div>
                                <div className={(this.state.selectedPortrait === 4 ? "display-block" : "display-none")}> 
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/justiceperezwhite/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/Justiceleeg/"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Backend Developer and Frontend Developer
                                        </p>
                                        <p>
                                            <span className="bold">Background: </span>
                                            From Texas
                                        </p>                             
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 5 ? "display-block" : "display-none")}> 
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/ndmueller/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/NDMueller"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Frontend Developer
                                        </p>
                                        <p>
                                            <span className="bold">Background: </span>
                                            From Minnesota but actually Tennesee
                                        </p>                             
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>

)}}