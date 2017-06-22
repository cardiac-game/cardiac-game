import React from 'react';
import './projectFooter.css';
// import { Link } from 'react-router-dom'; // to link to the about team

// 
// Possibly convert to class component and import all enemies ever killed in all games as a counter in bottom right ? 
// 
// Also add Link to ABout team page
//

//functional component (not class component) for components with no state
const projectFooter = () => {
    return (
        <div className="footer"><div className="textFooter">Cardiac is a Portfoilio piece.   <a href="#">About</a></div>
 </div>
    )
}

export default projectFooter;