import React from 'react';
import './header.styles.css';

export const Header = ({won, turn}) => {
    return (
        <div class="text">
            <h1 class="heading">Tic Tac Toe</h1>
            {won === false &&
                <p class="turn-indicator">It is {turn}'s turn</p>
            }
        </div>
    );
};