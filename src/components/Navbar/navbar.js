// 
//  LINKS CURRENTLY DO NOT WORK ON HOMEPAGE BC OF THE Z-INDEX on Homepage.CSS
// 


import React from 'react';
import { Link } from 'react-router-dom';

// import './navbar.css'

//functional component (not class component)
const Navbar = () => {
    return (
        <nav>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/healthy"><li>Health</li></Link>
                <Link to="/timeline"><li>Timeline</li></Link>
                <Link to="/input"><li>Game - Input</li></Link>
                <Link to="/game"><li>Game - Game</li></Link>          
            </ul>
        </nav>
    )
}

export default Navbar;