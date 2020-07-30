import React, { useEffect } from 'react';
import { useMaze } from '../hooks/useMaze';
import './Keypad.css'

function Keypad() {
    const { maze, action } = useMaze();
    const { reset, move } = action;

    useEffect(() => {
        const onKeyPress = (e) => {
            e.preventDefault();
            const key = { 119: 'up', 115: 'down', 97: 'left', 100: 'right' };
            const keyCode = e.keyCode;
            move(key[keyCode]);
        };

        window.addEventListener("keypress", onKeyPress);

        return () => {
            window.removeEventListener("keypress", onKeyPress);
        };
    }, [])

    return (
        <>
            {maze && <div id='Keypad'>
                <i className="arrow up" onClick={() => move('up')}></i>
                <i className="arrow down" onClick={() => move('down')}></i>
                <i className="arrow left" onClick={() => move('left')}></i>
                <i className="arrow right" onClick={() => move('right')}></i>
            </div>}
        </>
    );
}

export default Keypad;