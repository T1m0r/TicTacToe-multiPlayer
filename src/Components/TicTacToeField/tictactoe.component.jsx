import React from 'react';
import './tictactoe.styles.css';

export const tic_field = (props) => {
    return <div>
        {props.fields.map(field => (
            <div key={ field.id }>{field.symbol}</div> 
        ))}
    </div>;
}