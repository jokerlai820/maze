import React from 'react';
import Cell from './Cell';
import './Grid.css'

function Grid({ grid }) {
    return (
        <div className={`Grid`}>
            {
                grid.map((cell, key) => <Cell key={`Grid-${key}`} cell={cell} />)
            }
        </div>
    );
}

export default Grid;