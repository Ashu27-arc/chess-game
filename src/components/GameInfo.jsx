import { useState, useEffect } from 'react'

function GameInfo({ currentPlayer, moveList, capturedPieces, isCheck, isCheckmate }) {
  const [whiteTime, setWhiteTime] = useState(600) // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600)

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPlayer === 'white') {
        setWhiteTime(prev => Math.max(0, prev - 1))
      } else {
        setBlackTime(prev => Math.max(0, prev - 1))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentPlayer])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="md:ml-8 mt-4 md:mt-0 w-full md:w-64 bg-white p-4 rounded-lg shadow">
      <div className="mb-6">
        <div className="text-2xl font-bold bg-gray-800 text-white p-2 rounded">
          {formatTime(blackTime)}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Turn</h2>
        <div className={`capitalize font-semibold ${currentPlayer === 'white' ? 'text-amber-800' : 'text-gray-800'}`}>
          {currentPlayer}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Move List</h2>
        <div className="h-48 overflow-y-auto text-left">
          {moveList.map((move, index) => (
            <div key={index} className="text-sm">
              {Math.floor(index/2 + 1)}. {move}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-2xl font-bold bg-gray-800 text-white p-2 rounded">
          {formatTime(whiteTime)}
        </div>
      </div>

      {(isCheck || isCheckmate) && (
        <div className="text-red-600 font-bold mt-4">
          {isCheckmate ? 'Checkmate!' : 'Check!'}
        </div>
      )}
    </div>
  )
}

export default GameInfo 