import { useState } from 'react'
import './App.css'
import ChessBoard from './components/ChessBoard'
import GameInfo from './components/GameInfo'

function App() {
  const [gameState, setGameState] = useState({
    currentPlayer: 'white',
    moveList: [],
    capturedPieces: {
      white: [],
      black: []
    },
    isCheck: false,
    isCheckmate: false
  })

  const handleMove = (move) => {
    setGameState(prevState => ({
      ...prevState,
      currentPlayer: prevState.currentPlayer === 'white' ? 'black' : 'white',
      moveList: [...prevState.moveList, move]
    }))
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      <ChessBoard 
        currentPlayer={gameState.currentPlayer}
        onMove={handleMove}
      />
      <GameInfo 
        currentPlayer={gameState.currentPlayer}
        moveList={gameState.moveList}
        capturedPieces={gameState.capturedPieces}
        isCheck={gameState.isCheck}
        isCheckmate={gameState.isCheckmate}
      />
    </div>
  )
}

export default App
