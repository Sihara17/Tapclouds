"use client"

import { useState } from "react"

export const TapGame = () => {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)

  const handleTap = () => {
    if (energy > 0) {
      setCoins((prev) => prev + 1)
      setEnergy((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl font-bold">Coins: {coins}</p>
      <p>Energy: {energy}/100</p>
      <button
        onClick={handleTap}
        disabled={energy === 0}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Tap to Earn
      </button>
    </div>
  )
}
