import './MoveHistory.css';
import {React, useState, useEffect} from 'react';

export default function MoveHistory({ history }) {
    const [lastMove, setLastMove] = useState(-1);
    const [selectedMove, setSelectedMove] = useState(-1);

    useEffect(() => {
        if (history.length) {
            setLastMove(history.length-1);
            setSelectedMove(history.length-1);
        }
    }, [history]);
    
    const renderHistoryTable = () => {
        return history.map((move, i, history) => {
            const turn = Math.floor(i/2) + 1;
            if (move.color === 'b') {
                console.log('history', history, i);
                const whiteMove = i > 1 ? history[i-1].san : null;
                const blackMove = move.san;
                const whiteClassNames = (whiteMove === null
                    ? 'empty-move'
                    : (i-1 === selectedMove ? 'selected' : '') + ' move');
                const blackClassNames = (i === selectedMove ? 'selected' : '') + ' move';
                return (
                    <tr key={i}>
                        <td className='rowTurn'>{turn}</td>
                        <td className={whiteClassNames} onClick={() => whiteMove && goToHistoryIndex(i-1)}>{whiteMove || '...'}</td>
                        <td className={blackClassNames} onClick={() => blackMove && goToHistoryIndex(i)}>{blackMove}</td>
                    </tr>
                );
            } else if (move.color === 'w' && i === lastMove) {
                const whiteMove = move.san;
                const whiteClassNames = `${i === selectedMove ? 'selected' : ''} move`;
                return (
                    <tr key={i}>
                        <td className='rowTurn'>{turn}</td>
                        <td className={whiteClassNames} onClick={() => goToHistoryIndex(i)}>{whiteMove}</td>
                        <td />
                    </tr>
                );
            } else return undefined;
        });
    }

    const goToHistoryIndex = (historyIndex) => {
        console.log(historyIndex, history.slice(0, historyIndex+1).map(move => move.san));
        setSelectedMove(historyIndex);
    }

    return (
        <div className='box'>
            <h3 className='header'>Move History</h3>
            <table>
                <tbody>
                    {renderHistoryTable()}
                </tbody>
            </table>
        </div>
    );
}