import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

// import './navbar.css'

//functional component (not class component)
const Navbar = () => {
    return (
        <nav className="navbar-bar">
            <ul>
                <Link to="/"><div className="navbar-text navbar-home">HOME</div></Link>
                <Link to="/timeline"><div className="navbar-text navbar-timeline">TIMELINE</div></Link>
                <Link to="/nutrition"><div className="navbar-text navbar-nutrition">NUTIRUTION</div></Link>
                <Link to="/about"><div className="navbar-text navbar-about">ABOUT</div></Link>
                <Link to="/input"><div className="navbar-text navbar-game">GAME</div></Link>    
            </ul>
        </nav>
    )
}

export default Navbar;