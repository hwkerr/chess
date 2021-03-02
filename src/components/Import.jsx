import './Import.css';
import React, { useState } from 'react';

export default function Import({ importPosition }) {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    
    const errorMessage = 'Invalid FEN string';
    const handleImport = () => {
        setError(false);
        const validation = importPosition(input);
        if (!validation.valid) {
            setTimeout(() => setError(true), 200);
        }
    };

    return (
        <div>
            <textarea placeholder='Input FEN string' rows='2' cols='77' value={input} onChange={event => setInput(event.target.value)} />
            {error ? <p className='error-message'>{errorMessage}</p> : <br />}
            <button onClick={handleImport}>Import</button>
        </div>
    );
}