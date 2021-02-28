import React, { useState } from 'react';

export default function Import({ importPosition }) {
    const [input, setInput] = useState('');
    
    const handleImport = () => {
        importPosition(input);
    };

    return (
        <div>
            <textarea rows='2' cols='77' value={input} onChange={event => setInput(event.target.value)} />
            <br />
            <button onClick={handleImport}>Import</button>
        </div>
    );
}