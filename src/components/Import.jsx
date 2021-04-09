import './Import.css';
import React, { useState } from 'react';

export default function Import({ importFEN, importPGN }) {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    
    const errorMessage = 'Input is not in valid FEN or PGN notation';
    const handleImport = () => {
        setError(false);
        const valid = importFEN(input) || importPGN(input);
        if (!valid) {
            setTimeout(() => setError(true), 200);
        }
    };

    return (
        <div>
            <textarea placeholder='Input PGN or FEN notation' rows='2' cols='77' value={input} onChange={event => setInput(event.target.value)} />
            {error ? <p className='error-message'>{errorMessage}</p> : <br />}
            <button onClick={handleImport}>Import</button>
        </div>
    );
}