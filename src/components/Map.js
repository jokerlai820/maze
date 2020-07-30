import React from 'react';
import { useMaze } from '../hooks/useMaze';
import Keypad from './Keypad';
import Grid from './Grid';
import './Map.css'

function Map() {
    const { maze } = useMaze();

    if (!maze) return <div>loading...</div>
    return (
        <>
            <Keypad />
            <div className="Map">
                {
                    maze.map((grid, key) =>
                        <Grid key={`Gird-${key}`} grid={grid} />
                    )
                }
            </div>
        </>
    );
}

export default Map;