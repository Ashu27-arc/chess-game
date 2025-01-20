function Square({ isLight, piece, isSelected, isHighlighted, onClick }) {
  const backgroundColor = isLight ? 'bg-[#F0D9B5]' : 'bg-[#B58863]'
  const selectedClass = isSelected ? 'ring-2 ring-blue-500' : ''
  const highlightedClass = isHighlighted ? 'ring-2 ring-green-500 ring-opacity-50' : ''

  return (
    <div 
      className={`w-16 h-16 flex items-center justify-center ${backgroundColor} ${selectedClass} ${highlightedClass} cursor-pointer relative`}
      onClick={onClick}
    >
      {piece && (
        <span className="text-4xl select-none">
          {getPieceSymbol(piece)}
        </span>
      )}
      {isHighlighted && !piece && (
        <div className="absolute w-3 h-3 rounded-full bg-green-500 bg-opacity-50" />
      )}
    </div>
  )
}

function getPieceSymbol(piece) {
  const symbols = {
    white: {
      king: '♔',
      queen: '♕',
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙'
    },
    black: {
      king: '♚',
      queen: '♛',
      rook: '♜',
      bishop: '♝',
      knight: '♞',
      pawn: '♟'
    }
  }
  return symbols[piece.color][piece.type]
}

export default Square 