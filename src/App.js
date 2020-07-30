import React, { useEffect } from 'react';
import Map from './components/Map';
import Maze from './hooks/useMaze';
import './App.css';

function App() {
  return (
    <div className="Maze">
      <header className="Maze-header">_ _ _ _ ， _ _ _ _</header>
      <Maze size={60}>
        <Map />
      </Maze>
    </div>
  );
}

export default App;
