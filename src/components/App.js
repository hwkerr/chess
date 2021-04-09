import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';

import * as Chess from "chess.js";
import Chessboard from 'chessboardjsx';
import { Pgn } from 'cm-pgn';
import useSound from 'use-sound';

import moveSfx from '../sound/thump1.wav';
import takeSfx from '../sound/thump2.wav';
import Import from './Import';
import MoveHistory from './MoveHistory';

const DEFAULT_BOARD_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default function App() {
    const [orientation, setOrientation] = useState('white')
    const [position, setPosition] = useState('start');
    const [history, setHistory] = useState([]);
    const [selectedMove, setSelectedMove] = useState(-1);

    const [pieceSquare, setPieceSquare] = useState('');

    const [squareStyles, setSquareStyles] = useState({});
    const [dropSquareStyle, setDropSquareStyle] = useState({});
    const [markedSquares, setMarkedSquares] = useState([]);


    const game = useRef(null);
    useEffect(() => {
        game.current = new Chess();
    }, []);

    const importFEN = (fen) => {
        const { valid } = game.current.validate_fen(fen)
        console.log('Import FEN ' + (valid ? 'success' : 'failed'));
        if (valid) {
            setHistory([]);
            setSquareStyles({});
            game.current.load(fen);
            setPosition(fen);
        }
        return valid;
    };

    const importPGN = (pgnString) => {
        const valid = game.current.load_pgn(pgnString);
        const pgnHistory = new Pgn(pgnString).history.moves;
        console.log('Import PGN ' + (valid ? 'success' : 'failed'));
        if (valid) {
            setHistory(pgnHistory);
            setSquareStyles({});
            setPosition(pgnHistory[pgnHistory.length-1].fen);
            setSelectedMove(pgnHistory.length-1);

            const move = pgnHistory[pgnHistory.length-1];
            setSquareStyles(squareStyling('', move));
        }
        return valid;
    }

    const isShowingLatestMove = () => {
        return (selectedMove+1 === history.length);
    }
    
    const jumpToMove = (historyIndex) => {
        if (historyIndex < 0)
            setPosition(DEFAULT_BOARD_POSITION);
        else
            setPosition(history[historyIndex].fen);

        setPieceSquare('');
        setSelectedMove(historyIndex);
        
        const move = historyIndex >= 0 ? history[historyIndex] : undefined;
        setSquareStyles(squareStyling('', move));
    }

    const addMove = (move) => {
        setPosition(game.current.fen());
        
        const newHistory = game.current.history({ verbose: true });
        const newFen = game.current.fen();
        addToHistory(newHistory[newHistory.length-1], newFen);
        
        setPieceSquare('');
        setSelectedMove(newHistory.length-1);
        
        setSquareStyles(squareStyling('', move));
        playMoveSound(move);
    }

    const addToHistory = (lastMoveInHistory, newFen) => {
        setHistory(prev => [
            ...prev,
            {
                ...lastMoveInHistory,
                fen: newFen
            }
        ]);
    }

    const flipOrientation = () => {
        if (orientation === 'white') setOrientation('black');
        else if (orientation === 'black') setOrientation('white');
    }

    const onDrop = ({ sourceSquare, targetSquare }) => {
        if (!isShowingLatestMove()) return;

        // see if the move is legal
        const move = game.current.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null)
            return;
        else
            addMove(move);
    };

    const getLegalMoves = square => {
        const moves = game.current.moves({
            square: square,
            verbose: true
        });

        return moves.map(move => move.to);
    };

    const onMouseOverSquare = square => {
        // showLegalMoves(square);
    };

    const onMouseOutSquare = square => {
        // removeHighlightSquare(square);
    }

    // central squares get diff dropSquareStyles
    const onDragOverSquare = square => {
        if (markedSquares.length)
            setMarkedSquares([]);
        setDropSquareStyle(
            square === "e4" || square === "d4" || square === "e5" || square === "d5"
                ? { backgroundColor: "cornFlowerBlue" }
                : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
        );
    };

    const onSquareClick = square => {
        if (markedSquares.length)
            setMarkedSquares([]);
        if (pieceSquare === square) {
            setPieceSquare('');
            setSquareStyles(squareStyling(''));
        } else {
            if (!isShowingLatestMove()) return;
            
            const move = game.current.move({
                from: pieceSquare,
                to: square,
                promotion: "q" // always promote to a queen for example simplicity
            });
    
            // illegal move
            if (move === null) {
                setPieceSquare(square);
                setSquareStyles(squareStyling(square));
            }
            // legal move
            else if (move !== null) {
                addMove(move);
            }
        }
    };

    const onSquareRightClick = square => {
        let updatedMarkedSquares;
        if (markedSquares.includes(square)) {
            updatedMarkedSquares = markedSquares.filter(el => el !== square);
            setMarkedSquares(updatedMarkedSquares);
        } else {
            updatedMarkedSquares = [...markedSquares, square];
            setMarkedSquares(updatedMarkedSquares);
        }
        setSquareStyles(
            combineSquareStyling(
                squareStyling(''),
                updatedMarkedSquares.reduce((styleObj, currentSquare) => {
                    return {
                        ...styleObj,
                        [currentSquare]: { backgroundColor: "rgba(205, 92, 92, 0.8)" }
                    }
                }, {})
            )
        );
    };

    const combineSquareStyling = (styleObj1, styleObj2) => {
        return {
            ...styleObj1,
            ...styleObj2
        };
    };

    const squareStyling = (selectedSquare, move=undefined) => {
        let styling = {};

        // show selected piece highlighting
        const turn = game.current.turn();
        const piece = game.current.get(selectedSquare);
        if (piece && (turn === piece.color)) {
            styling[selectedSquare] = { backgroundColor: "rgba(255, 255, 0, 0.3)" };

            // show legal move highlighting
            const legalMoves = getLegalMoves(selectedSquare);
            legalMoves.forEach(legalMove => {
                styling[legalMove] = {
                    background: "radial-gradient(circle, #ffff00 20%, transparent 30%)",
                    borderRadius: "50%"
                }
            });
        }
    
        // show last-move highlighting
        const lastMove = move;
        if (lastMove) {
            const sourceSquare = lastMove.from;
            const targetSquare = lastMove.to;

            styling[sourceSquare] = { backgroundColor: "rgba(0, 200, 0, 0.3)" };
            styling[targetSquare] = { backgroundColor: "rgba(0, 200, 0, 0.3)" };
        }
    
        return styling;
    };

    const handleKeyDown = event => {
        if (event.key === 'ArrowLeft') {
            if (selectedMove >= 0)
                jumpToMove(selectedMove-1);
        } else if (event.key === 'ArrowRight') {
            if (selectedMove+1 < history.length)
                jumpToMove(selectedMove+1);
        } else if (event.key === 'ArrowUp' || event.key === '0') {
            jumpToMove(-1);
        } else if (event.key === 'ArrowDown') {
            jumpToMove(history.length-1);
        } else if (event.key === 'f') {
            flipOrientation();
        }
    }

    const playMoveSound = move => {
        if (move == null)
            return;

        if (move.flags.includes('c') || move.flags.includes('e')) { // capture; en-passant
            playPieceCaptureSfx();
        } else if (move.flags.includes('k') || move.flags.includes('q')) { // castle
            playPieceCaptureSfx();
            setTimeout(() => playPieceMoveSfx(), 100);
        } else {
            playPieceMoveSfx();
        }
    };

    const [playPieceMoveSfx] = useSound(
        moveSfx,
        { volume: 1.5 }
    );

    const [playPieceCaptureSfx] = useSound(
        takeSfx,
        { volume: 1.5 }
    );

    return (
        <div className="App" onKeyDown={handleKeyDown} tabIndex="0">
            <h1>Chess</h1>
            <Grid container>
                <div>
                    <Chessboard
                        position={position}
                        orientation={orientation}
                        width={600}
                        onDrop={onDrop}
                        onMouseOverSquare={onMouseOverSquare}
                        onMouseOutSquare={onMouseOutSquare}
                        boardStyle={{
                            borderRadius: "5px",
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
                            cursor: 'pointer'
                        }}
                        squareStyles={squareStyles}
                        dropSquareStyle={dropSquareStyle}
                        onDragOverSquare={onDragOverSquare}
                        onSquareClick={onSquareClick}
                        onSquareRightClick={onSquareRightClick}
                    />
                    <br />
                    <Import importFEN={importFEN} importPGN={importPGN} />
                    <br />
                    <button onClick={flipOrientation}>Flip</button>
                </div>
                <div style={{ position: 'absolute', left: '1000px' }}>
                    <MoveHistory
                        history={history}
                        selectedMove={selectedMove}
                        onClickMove={jumpToMove}
                    />
                </div>
            </Grid>
            <footer>
                <div>
                    Built by <a href='https://hwkerr.github.io'>Harrison Kerr</a>
                </div>
            </footer>
        </div>
    );
}