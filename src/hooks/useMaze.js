import React, { createContext, useContext, useEffect, useState } from 'react';

const mazeContext = createContext();

export default function Maze({ size, children }) {
    const maze = useMazeProvider(size);

    return <mazeContext.Provider value={maze}>{children}</mazeContext.Provider>;
}

export function useMaze() {
    return useContext(mazeContext);
}

export function useMazeProvider(size) {
    const direction = ['dE', 'dS', 'dW', 'dN'];
    const dX = { 'dE': 0, 'dS': 1, 'dW': 0, 'dN': -1 };
    const dY = { 'dE': 1, 'dS': 0, 'dW': -1, 'dN': 0 };
    const opposite = { dE: 'dW', dW: 'dE', dN: 'dS', dS: 'dN' };
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({
        previous: {
            x: 0,
            y: 0,
        },
        current: {
            x: 0,//getRandomArbitrary(size - 1),
            y: 0//getRandomArbitrary(size - 1),
        }
    });
    const [maze, setMaze] = useState(newMaze());

    function getRandomArbitrary(max) {
        return Math.floor(Math.random() * max);
    }

    function newMaze() {
        const x = position.current.x;
        const y = position.current.y;
        let _maze = [];

        for (let i = 0; i < size; i++) {
            _maze[i] = [];
            for (let j = 0; j < size; j++) {
                _maze[i][j] = newGird(i, j, size);
            }
        }

        _maze[x][y].start = true;
        _maze[x][y].current = true;

        return route(x, y, _maze);
    }

    function newGird(x, y, size) {
        return {
            key: (x + 1) * (y + 1),
            x: x,
            y: y,
            dE: Number(y === size - 1 || (y > 0 || y < size - 1)),
            dS: Number(x === size - 1 || (x > 0 || x < size - 1)),
            dW: Number(y === 0),
            dN: Number(x === 0),
            value: 0,
            bonus: Math.round(Math.random()),
            current: false,
        }
    }

    function newDirection(x, y, maze) {
        return direction.filter(dir => {
            const newX = x + dX[dir];
            const newY = y + dY[dir];
            const newGird = maze[newX] && maze[newX][newY];

            if (newGird && !newGird.value) return dir;
        });
    }

    function route(x, y, maze) { // Recursive Backtracking
        const curX = x;
        const curY = y;
        const current = maze[curX][curY];
        const available = newDirection(curX, curY, maze);

        if (!available.length) { return maze; };

        const randDir = available[getRandomArbitrary(available.length)];
        const nextX = curX + dX[randDir];
        const nextY = curY + dY[randDir];
        const next = maze[nextX] && maze[nextX][nextY];

        if (next) {
            current.value++;
            current[randDir] -= 1;
            next.value++;
            next[opposite[randDir]] -= 1;
            route(nextX, nextY, maze);
        }

        return route(nextX, nextY, maze);
    }

    function reset() {
        setLoading(true);
        setPosition({
            ...position,
            current: {
                ...position.current,
                x: getRandomArbitrary(size - 1),
                y: getRandomArbitrary(size - 1),
            }
        });
    }

    async function move(towards) {
        const { current } = position;
        const { x, y } = current;
        const movement = { up: 'dN', down: 'dS', left: 'dW', right: 'dE' };
        const curGird = maze[x][y];
        const nextX = x + dX[movement[towards]];
        const nextY = y + dY[movement[towards]];
        const nextGird = maze[nextX] && maze[nextX][nextY];

        if (!nextGird ||
            (curGird[movement[towards]] > 0 ||
                nextGird[opposite[movement[towards]]] > 0)
        ) return;

        console.log(`[From] ${x} ${y} and go ${towards}`);
        curGird.current = 0;
        nextGird.current = 1;
        await setMaze(maze);
        await setPosition({
            ...position,
            previous: current,
            current: {
                ...position.current,
                x: nextX,
                y: nextY,
            }
        });

    }

    useEffect(() => {
        if (loading) {
            setMaze(newMaze());
            setLoading(false);
        }
        return () => console.log('[useMaze]');
    }, [position.current.x, position.current.y])
    
    return {
        maze,
        loading,
        position,
        action: {
            reset,
            move
        }
    }
}