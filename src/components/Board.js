import { useState } from 'react';
import Square from './Square';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const status = winner
    ? `Winner: ${winner}`
    : squares.every((sq) => sq !== null)
    ? 'Draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winningLine = winnerInfo ? winnerInfo.line : [];

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
            highlight={winningLine.includes(i)}
          />
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
