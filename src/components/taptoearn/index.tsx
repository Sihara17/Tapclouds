"use client"
import { useCallback, useEffect, useState } from "react"
import type React from "react"

import { Button } from "@worldcoin/mini-apps-ui-kit-react"

const MAX_ENERGY = 500
const ENERGY_INTERVAL_MS = 5000

interface TapToEarnProps {
  coins: number
  setCoins: React.Dispatch<React.SetStateAction<number>>
}

export default function TapToEarn({ coins, setCoins }: TapToEarnProps) {
  const [energy, setEnergy] = useState(MAX_ENERGY)
  const [loading, setLoading] = useState(false)

  const handleTap = useCallback(() => {
    if (energy <= 0) return

    setCoins((prev) => prev + 1)
    setEnergy((prev) => Math.max(0, prev - 1))
  }, [energy, setCoins])

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(MAX_ENERGY, prev + 1))
    }, ENERGY_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm bg-white shadow-md rounded-2xl p-4">
      <p className="text-sm text-gray-500">
        Energy: {energy}/{MAX_ENERGY}
      </p>
      <p className="text-sm text-gray-500">Coins: {coins}</p>
      <Button onClick={handleTap} disabled={energy === 0} variant="primary">
        Tap ☁️
      </Button>
    </div>
  )
}
