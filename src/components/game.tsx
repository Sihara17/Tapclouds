"use client"

import { useState, useEffect } from "react"

export const Game = () => {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)

  useEffect(() => {
    const saved = localStorage.getItem("coins")
    if (saved) setCoins(Number(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("coins", coins.toString())
  }, [coins])

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(100, prev + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const tap = () => {
    if (energy > 0) {
      setCoins((prev) => prev + 1)
      setEnergy((prev) => prev - 1)
    }
  }

  const claim = async () => {
    if (coins === 0) return

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coins }),
      })

      if (res.ok) {
        setCoins(0)
        localStorage.setItem("coins", "0")
        alert("Coins claimed!")
      }
    } catch (error) {
      console.error("Claim failed:", error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">TapCloud</h1>
        <p className="text-xl">Coins: {coins}</p>
        <p className="text-sm text-gray-600">Energy: {energy}/100</p>
      </div>

      <button
        onClick={tap}
        disabled={energy === 0}
        className="w-32 h-32 rounded-full bg-blue-500 text-white text-2xl font-bold disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
      >
        TAP
      </button>

      <button
        onClick={claim}
        disabled={coins === 0}
        className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-green-600 transition-colors"
      >
        Claim {coins} TCL
      </button>
    </div>
  )
}
