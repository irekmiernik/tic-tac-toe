import Square from "../Square";

export default function Board({ currentMove, squares, onPlay }) {

    const boardLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    function calculateWinner(squares) {
        for (let i = 0; i < boardLines.length; i++) {
            const [a, b, c] = boardLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    function calculateDraw(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) return null;
        };
        return true;
    };

    function getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    function computerMove(squares) {

        if (!calculateWinner(squares)) {
            for (let i = 0; i < boardLines.length; i++) {
                if (boardLines[i].filter((line) => line === "O").length > 1) {
                    for (let j = 0; j < 3; j++) {
                        if (!squares[boardLines[i][j]]) {
                            squares[boardLines[i][j]] = "O";
                            return;
                        };
                    };
                };
            }
            let number = getRandomIntInclusive(0, 8 - (currentMove * 2 + 1));
            let j = 0;
            for (let i = 0; i < squares.length; i++) {
                if (!squares[i]) {
                    if (number === j) {
                        squares[i] = "O";
                        break;
                    };
                    j = j + 1;
                };
            };
        }
    };

    function handleClick(i) {
        if (!squares[i] && !calculateWinner(squares)) {
            const newSquares = squares.slice();
            newSquares[i] = "X";
            computerMove(newSquares);
            onPlay(newSquares);
        };
    };

    let status = calculateWinner(squares);
    if (status) {
        if (status === "X") status = "Congratulation! You win!";
        else status = "I am very sorry. You have lost!";
    } else {
        if (calculateDraw(squares)) {
            status = "Game is over: draw";
        } else {
            status = "I am waiting for your turn, please!";
        };
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
};