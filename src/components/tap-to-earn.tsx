"use client"

import { useState, useEffect } from "react"

interface TapToEarnProps {
  coins: number
  setCoins: (coins: number) => void
}

export const TapToEarn = ({ coins, setCoins }: TapToEarnProps) => {
  const [energy, setEnergy] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(100, prev + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleTap = () => {
    if (energy > 0) {
      setCoins(coins + 1)
      setEnergy((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${energy}%` }}></div>
      </div>
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
