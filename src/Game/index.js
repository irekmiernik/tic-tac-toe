import { useState } from "react";
import Board from "../Board";
import Moves from "../Moves";

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(newSquares) {
        const newHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);
    };

    function jumpTo(move) {
        setCurrentMove(move);
        setHistory(history.slice(0, move + 1));
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board currentMove={currentMove} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <Moves history={history} jumpTo={jumpTo} />
            </div>
        </div>
    )
};