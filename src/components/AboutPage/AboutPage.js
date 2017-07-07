import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

import reactLogo from './images/react_logo.png';
import reduxLogo from './images/redux_logo.svg'
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
                                    The frontend logic and data management is handled through the use of React.js. The use of this technology was a first for the development team.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={reduxLogo} alt="react logo"/>
                                </div>
                                <div className="about-logo-info">
                                    Both application state and game state are managed with Redux.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={HTMLLogo} alt="HTML5 logo"/>
                                </div>
                                <div className="about-logo-info">
                                    The game is drawn entirely within a HTML5 canvas element using vanilla javascript.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={nodeLogo} alt="nodejs logo"/>
                                </div>
                                <div className="about-logo-info">
                                    Node.js enables server-side scripting entirely in javascript to create dynamic content.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-express" src={expressLogo} alt="express logo"/>
                                </div>
                                <div className="about-logo-info">
                                    API calls to the postgreSQL database and to external APIs are done by the server framework, Express.js.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={postgresLogo} alt="postgreSQL logo"/>
                                </div>
                                <div className="about-logo-info">
                                    The database server is done using the postgreSQL object-relational database management system. Queries and data sorting are done directly through SQL files with the use of Massive.js.
                                </div>
                            </div>
                            <div className="about-tech">
                                <div className="about-logo-container">
                                    <img className="about-logo-img" src={herokuLogo} alt="heroku logo"/>
                                </div>
                                <div className="about-logo-info">
                                    The cloud platform, Heroku allows for an easily built and accessible database.
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
                            <div className="about-spacer "></div>
                            <div className="about-spacer "></div>
                            <div className="about-spacer "></div>
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
                                <div className={"portrait-text-container " + (this.state.selectedPortrait === 1 ? "text-black" : "text-transparent")}>
                                    <div className="portrait-name-container">Eric Patterson</div>
                                    <div className="portrait-role-container">Frontend Developer and Game Designer</div>
                                </div>
                                <div className={"portrait-text-container " + (this.state.selectedPortrait === 2 ? "text-black" : "text-transparent")}>
                                    <div className="portrait-name-container">Ivor Anderson</div>
                                    <div className="portrait-role-container">Frontend Developer and Designer</div>
                                </div>
                                <div className={"portrait-text-container " + (this.state.selectedPortrait === 3 ? "text-black" : "text-transparent")}>
                                    <div className="portrait-name-container">Jesse Tenney</div>
                                    <div className="portrait-role-container">Fullstack Developer</div>
                                </div>
                                <div className={"portrait-text-container " + (this.state.selectedPortrait === 4 ? "text-black" : "text-transparent")}>
                                    <div className="portrait-name-container">Justice Perez White</div>
                                    <div className="portrait-role-container">Fullstack Developer</div>
                                </div>
                                <div className={"portrait-text-container " + (this.state.selectedPortrait === 5 ? "text-black" : "text-transparent")}>
                                    <div className="portrait-name-container">Nicholas Mueller</div>
                                    <div className="portrait-role-container">Frontend Developer and Researcher</div>
                                </div>
                            </div>
                            <div className="about-spacer ">
                                <hr />
                            </div>
                            <div className="portrait-info">
                                <div className={(this.state.selectedPortrait === 1 ? "display-block" : "display-none")}>
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/eric-patterson-00477966/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/erpatterson11"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Game Developer in charge of technical design and development of the Cardiac game. Responsible for game logic, physics, and performance.
                                        </p>
                                        <br/>
                                        <p>
                                            <span className="bold">Background: </span>
                                            Before building awesome interactive content for the web Eric was improving manufacturing processes as an engineer for a company that made brain implants.
                                        </p>
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 2 ? "display-block" : "display-none")}>
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/ivor-anderson-824011b7/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/elderandi"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Frontend Developer and Lead Designer, in charge of building the frontend, styling it and creating a beautiful overall experience. Also responsible for transforming complex API data into a user-friendly and clean display on the view.
                                        </p>
                                        <br/>
                                        <p>
                                            <span className="bold">Background: </span>
                                            Born and raised in New Zealand before moving to multiple countries aroung the world, Ivor found himself working in graphic design, animations, and character design/development for a TV show.
                                        </p>
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 3 ? "display-block" : "display-none")}>
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/jesse-tenney-5a0969139/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/jesse10e"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Responsible for building the services and setting up the API calls. In charge of the leaderboard and configuring axios in both Reactjs and Nodejs. Lead troubleshooting of frontend bugs.
                                        </p>
                                        <br/>
                                        <p>
                                            <span className="bold">Background: </span>
                                            Born in Yuba City, CA. Jesse moved to Utah in 2014 to work in the IT industry and started web development in 2017.
                                        </p>
                                    </div>
                                </div>
                                <div className={(this.state.selectedPortrait === 4 ? "display-block" : "display-none")}>
                                    <a className="about-a" target="_blank" href="https://www.linkedin.com/in/justiceperezwhite/"><i className="fa fa-linkedin-square about-icon" aria-hidden="true"></i></a>
                                    <a className="about-a" target="_blank" href="https://github.com/Justiceleeg/"><i className="fa fa-github-square about-icon" aria-hidden="true"></i></a>
                                    <div className="portrait-info-text">
                                        <p><span className="bold">Roles and Responsiblilities: </span>
                                            Lead Backend Developer and Frontend Developer in charge of building the Node.js server for API calls and queries to the PostgreSQL database on Heroku. Responsible for data exchange within the App and creating the About page on the frontend.
                                        </p>
                                        <br/>
                                        <p>
                                            <span className="bold">Background: </span>
                                            Military brat with a degree in Mechanical Engineering from Rice University. Previous work experience in healthcare includes Quality Engineering in biotherapeutics and Information Technology work with electronic health records.
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
                                        <br/>
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
