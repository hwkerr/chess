import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';

import * as Chess from "chess.js";
import Chessboard from 'chessboardjsx';
import Import from './Import';

import useSound from 'use-sound';
import moveSfx from '../sound/thump1.wav';
import takeSfx from '../sound/thump2.wav';
import MoveHistory from './MoveHistory';

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

    useEffect(() => {
        setSelectedMove(history.length-1);
    }, [history]);

    const importPosition = (fen) => {
        const validation = game.current.validate_fen(fen)
        console.log('Import:', validation);
        if (validation.valid) {
            setHistory([]);
            setSquareStyles({});
            game.current.load(fen);
            setPosition(fen);
        }
        return validation;
    };

    const goToMove = (historyIndex) => {
        
        setSelectedMove(historyIndex);
    }

    const flipOrientation = () => {
        if (orientation === 'white') setOrientation('black');
        else if (orientation === 'black') setOrientation('white');
    }

    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        const move = game.current.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null)
            return;
        setPosition(game.current.fen());
        setHistory(game.current.history({ verbose: true }));
        setSquareStyles(squareStyling('', move));
        setPieceSquare('');
        playMoveSound(move);
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
            let move = game.current.move({
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
                setPosition(game.current.fen());
                setHistory(game.current.history({ verbose: true }));

                setPieceSquare('');
                setSquareStyles(squareStyling('', move));
                playMoveSound(move);
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
        const lastMove = move ? move
            : history.length ? history[history.length - 1] : null;
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
            if (selectedMove > 0)
                goToMove(selectedMove-1);
        } else if (event.key === 'ArrowRight') {
            if (selectedMove+1 < history.length)
                goToMove(selectedMove+1);
        } else if (event.key === '0') {
            goToMove(0);
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
            <Grid container spacing={3}>
                <Grid item xs={6}>
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
                    <Import importPosition={importPosition} />
                    <br />
                    <button onClick={flipOrientation}>Flip</button>
                </Grid>
                <Grid item xs={3}>
                    <MoveHistory
                        history={history}
                        selectedMove={selectedMove}
                        onClickMove={goToMove}
                    />
                </Grid>
            </Grid>
            <footer>
                <div>
                    Built by <a href='https://hwkerr.github.io'>Harrison Kerr</a>
                </div>
            </footer>
        </div>
    );
}