import './App.css';
import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import Import from './Import';

export default function App() {
    const [position, setPosition] = useState('start');
    const [orientation, setOrientation] = useState('white')

    const importPosition = (position) => {
        setPosition(position);
    };

    const flipOrientation = () => {
        if (orientation == 'white') setOrientation('black');
        else if (orientation == 'black') setOrientation('white');
    }

    return (
        <div className="App" style={{ width: '70%', margin: 'auto' }}>
            <h1>Double D Chess</h1>
            <p>no legal move checks</p>
            <Chessboard
                position={position}
                orientation={orientation}
            />
            <br />
            <Import importPosition={importPosition} />
            <br />
            <button onClick={flipOrientation}>Flip</button>
            <footer>
                <div>Built by <a href='https://hwkerr.github.io'>Harrison Kerr</a> with React, Chessboard.jsx, and Chess.js</div>
            </footer>
        </div>
    );
}