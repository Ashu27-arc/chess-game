export function initialBoardSetup() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null))
  
  // Set up pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' }
    board[6][i] = { type: 'pawn', color: 'white' }
  }

  // Set up other pieces
  const setupRow = (row, color) => {
    board[row][0] = { type: 'rook', color }
    board[row][1] = { type: 'knight', color }
    board[row][2] = { type: 'bishop', color }
    board[row][3] = { type: 'queen', color }
    board[row][4] = { type: 'king', color }
    board[row][5] = { type: 'bishop', color }
    board[row][6] = { type: 'knight', color }
    board[row][7] = { type: 'rook', color }
  }

  setupRow(0, 'black')
  setupRow(7, 'white')

  return board
}

export function isValidMove(board, selectedPiece, targetRow, targetCol) {
  const { row: startRow, col: startCol, piece } = selectedPiece
  
  // Basic validation
  if (targetRow < 0 || targetRow > 7 || targetCol < 0 || targetCol > 7) {
    return false
  }

  // Can't move to the same square
  if (startRow === targetRow && startCol === targetCol) {
    return false
  }

  // Can't capture own pieces
  if (board[targetRow][targetCol]?.color === piece.color) {
    return false
  }

  // Check piece-specific movement rules
  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(board, startRow, startCol, targetRow, targetCol, piece.color)
    case 'rook':
      return isValidRookMove(board, startRow, startCol, targetRow, targetCol, board)
    case 'knight':
      return isValidKnightMove(startRow, startCol, targetRow, targetCol)
    case 'bishop':
      return isValidBishopMove(board, startRow, startCol, targetRow, targetCol, board)
    case 'queen':
      return isValidQueenMove(board, startRow, startCol, targetRow, targetCol, board)
    case 'king':
      return isValidKingMove(startRow, startCol, targetRow, targetCol)
    default:
      return false
  }
}

function isValidPawnMove(board, startRow, startCol, targetRow, targetCol, color) {
  const direction = color === 'white' ? -1 : 1
  const startRank = color === 'white' ? 6 : 1

  // Forward movement
  if (startCol === targetCol) {
    // Single square forward
    if (targetRow === startRow + direction && !board[targetRow][targetCol]) {
      return true
    }
    // Initial two square move
    if (startRow === startRank && 
        targetRow === startRow + 2 * direction && 
        !board[startRow + direction][startCol] && 
        !board[targetRow][targetCol]) {
      return true
    }
  }
  
  // Capture diagonally
  if (targetRow === startRow + direction && 
      Math.abs(targetCol - startCol) === 1 && 
      board[targetRow][targetCol]) {
    return board[targetRow][targetCol].color !== color
  }

  return false
}

function isValidRookMove(board, startRow, startCol, targetRow, targetCol) {
  // Rook must move horizontally or vertically
  if (startRow !== targetRow && startCol !== targetCol) {
    return false
  }

  // Check if path is clear
  const rowStep = startRow === targetRow ? 0 : (targetRow > startRow ? 1 : -1)
  const colStep = startCol === targetCol ? 0 : (targetCol > startCol ? 1 : -1)

  let currentRow = startRow + rowStep
  let currentCol = startCol + colStep

  while (currentRow !== targetRow || currentCol !== targetCol) {
    if (board[currentRow][currentCol]) {
      return false // Path is blocked
    }
    currentRow += rowStep
    currentCol += colStep
  }

  return true
}

function isValidKnightMove(startRow, startCol, targetRow, targetCol) {
  const rowDiff = Math.abs(targetRow - startRow)
  const colDiff = Math.abs(targetCol - startCol)
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
}

function isValidBishopMove(board, startRow, startCol, targetRow, targetCol) {
  const rowDiff = Math.abs(targetRow - startRow)
  const colDiff = Math.abs(targetCol - startCol)

  // Bishop must move diagonally
  if (rowDiff !== colDiff) {
    return false
  }

  // Check if path is clear
  const rowStep = targetRow > startRow ? 1 : -1
  const colStep = targetCol > startCol ? 1 : -1

  let currentRow = startRow + rowStep
  let currentCol = startCol + colStep

  while (currentRow !== targetRow && currentCol !== targetCol) {
    if (board[currentRow][currentCol]) {
      return false // Path is blocked
    }
    currentRow += rowStep
    currentCol += colStep
  }

  return true
}

function isValidQueenMove(board, startRow, startCol, targetRow, targetCol) {
  // Queen combines rook and bishop movements
  return isValidRookMove(board, startRow, startCol, targetRow, targetCol) ||
         isValidBishopMove(board, startRow, startCol, targetRow, targetCol)
}

function isValidKingMove(startRow, startCol, targetRow, targetCol) {
  const rowDiff = Math.abs(targetRow - startRow)
  const colDiff = Math.abs(targetCol - startCol)
  return rowDiff <= 1 && colDiff <= 1
}

// Add this new function to generate chess notation
export function getMoveNotation(piece, startRow, startCol, endRow, endCol, capturedPiece) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
  
  const pieceSymbols = {
    king: 'K',
    queen: 'Q',
    rook: 'R',
    bishop: 'B',
    knight: 'N',
    pawn: ''
  }

  let notation = ''
  
  // Add piece symbol (except for pawns)
  if (piece.type !== 'pawn') {
    notation += pieceSymbols[piece.type]
  }
  
  // Add 'x' if there's a capture
  if (capturedPiece) {
    if (piece.type === 'pawn') {
      notation += files[startCol]
    }
    notation += 'x'
  }
  
  // Add destination square
  notation += files[endCol] + ranks[endRow]
  
  return notation
} 