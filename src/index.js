import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar/navbar';
import HomePage from './components/HomePage/homePage';
import ProjectFooter from './components/ProjectFooter/projectFooter';
import AboutPage from './components/AboutPage/AboutPage';
import GamePage from './components/GamePage/GamePage';
import HealthInput from './components/HealthInput/healthInput';
import Nutrition from './components/Nutrition/nutrition';
import Timeline from './components/Timeline/timeline';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store from './store/store';

ReactDOM.render(
<Provider store = {store} >
    <Router>
        <div>
        <Navbar />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path="/about" component = {AboutPage}/>
            <Route path="/nutrition" component = {Nutrition}/>
            <Route path="/timeline" component = {Timeline}/>
            <Route path="/input" component = {HealthInput}/>
            <Route path="/game" component={GamePage}/>
        </Switch>
        <ProjectFooter />
        </div>
    </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
