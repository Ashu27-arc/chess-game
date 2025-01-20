import { useState } from 'react'
import Square from './Square'
import { initialBoardSetup, isValidMove, getMoveNotation } from '../utils/chessLogic'

function ChessBoard({ currentPlayer, onMove }) {
  const [board, setBoard] = useState(initialBoardSetup())
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [possibleMoves, setPossibleMoves] = useState([])
  
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

  const handleSquareClick = (row, col) => {
    if (!selectedPiece) {
      // Select piece if it belongs to current player
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ row, col, piece })
        // Calculate possible moves for the selected piece
        const moves = calculatePossibleMoves(board, row, col, piece)
        setPossibleMoves(moves)
      }
    } else {
      // Attempt to move piece
      if (isValidMove(board, selectedPiece, row, col)) {
        const newBoard = [...board.map(row => [...row])]
        const capturedPiece = newBoard[row][col]
        
        // Move the piece
        newBoard[row][col] = selectedPiece.piece
        newBoard[selectedPiece.row][selectedPiece.col] = null
        
        setBoard(newBoard)
        
        // Generate move notation (e.g., "e4", "Nf3", etc.)
        const moveNotation = getMoveNotation(
          selectedPiece.piece,
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          capturedPiece
        )
        
        onMove({
          notation: moveNotation,
          piece: selectedPiece.piece,
          from: { row: selectedPiece.row, col: selectedPiece.col },
          to: { row, col },
          captured: capturedPiece
        })
      }
      setSelectedPiece(null)
      setPossibleMoves([])
    }
  }

  return (
    <div className="relative">
      {/* Rank labels (numbers) */}
      <div className="absolute right-full top-0 bottom-0 w-6 flex flex-col justify-around">
        {ranks.map((rank) => (
          <div key={rank} className="text-sm text-gray-600">{rank}</div>
        ))}
      </div>

      {/* File labels (letters) */}
      <div className="absolute left-0 right-0 bottom-full h-6 flex justify-around">
        {files.map((file) => (
          <div key={file} className="text-sm text-gray-600">{file}</div>
        ))}
      </div>

      {/* Chess board */}
      <div className="grid grid-cols-8 gap-0 border-2 border-[#7D694C]">
        {board.map((row, rowIndex) => (
          row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              isLight={(rowIndex + colIndex) % 2 === 0}
              piece={piece}
              isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
              isHighlighted={possibleMoves.some(move => 
                move.row === rowIndex && move.col === colIndex
              )}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
    </div>
  )
}

function calculatePossibleMoves(board, row, col, piece) {
  const moves = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMove(board, { row, col, piece }, i, j)) {
        moves.push({ row: i, col: j })
      }
    }
  }
  return moves
}

export default ChessBoard 