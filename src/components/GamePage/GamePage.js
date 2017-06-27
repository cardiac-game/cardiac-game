//
// This is the container for the game
//

import React from 'react';
import {Modal} from './Leaderboard/leaderboard'

//functional component (not class component) for components with no state
const gamePage = () => {
    return (
        <div>
            <h1>HI WELCOME TO THE GAME CONTAINER PAGE. PEW PEW</h1>
            <Modal />

        </div>
    )
}

export default gamePage;
