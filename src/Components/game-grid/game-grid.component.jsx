import React from 'react';
import './game-grid.styles.css';
import { TicPanel } from "../tic-panel/tic-panel.component.jsx";

const GameGrid = (props) => {
    return (
        <div className="game-grid">
            {props.fields.map(field => (
                <TicPanel onTic={props.onTic} key={ field.id } field={field}></TicPanel>
            ))}
            <div className={`strikethrough ${props.strikeClass}`}><div></div></div>
        </div>
    );
};

export { GameGrid };