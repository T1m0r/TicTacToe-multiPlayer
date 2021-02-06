import React from 'react';
import './tic-panel.styles.css';

export const TicPanel = (props) => (
    <button onClick={() => props.onTic(props.field.id)} className={`tic-panel panel_${props.field.id}`} >
        {props.field.symbol}
    </button>
);