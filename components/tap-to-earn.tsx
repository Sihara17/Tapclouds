"use client"

import { useState } from "react"

export const TapToEarn = ({ coins, setCoins }: { coins: number; setCoins: (coins: number) => void }) => {
  const [energy, setEnergy] = useState(100)

  const handleTap = () => {
    if (energy > 0) {
      setCoins(coins + 1)
      setEnergy((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow">
      <p className="text-sm text-gray-600">Energy: {energy}/100</p>
      <button
        onClick={handleTap}
        disabled={energy === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        Tap to Earn
      </button>
    </div>
  )
}
