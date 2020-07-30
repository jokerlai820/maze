import React from 'react';
import './Cell.css'

function Cell({ cell }) {
    const { x, y, dE, dS, dW, dN, bonus, start, end, current } = cell;

    return (
        <button
            className={`Cell E-${dE} S-${dS} W-${dW} N-${dN} `}
            data-position={[x, y]}
            data-wall={[dE, dS, dW, dN]}
            data-bonus={bonus}
        >
            {(start || end) ? <i className={`start`}></i> : null}
            {current ? <i className={`current`}>●</i> : null}
        </button>
    );
}

export default Cell;