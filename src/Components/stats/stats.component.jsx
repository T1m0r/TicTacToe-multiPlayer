import React from 'react';
import './stats.styles.css';

export const Stats = ({stats}) => {
    return(
        <div class="stats">
                <h1>Stats</h1>
                <h3>O-wins: {stats.wins_O}</h3>
                <h3>X-wins: {stats.wins_X}</h3>
                <h3>Draws: {stats.draws}</h3>
              </div>
    );
};