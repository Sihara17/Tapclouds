"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./auth-context"

export const Game = () => {
  const { user, updateUser } = useAuth()
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [isTapping, setIsTapping] = useState(false)

  // Load user data
  useEffect(() => {
    if (user) {
      setCoins(user.coins || 0)
      setEnergy(user.energy || 100)
    }
  }, [user])

  // Energy regeneration
  useEffect(() => {
    if (!user) return

    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, action: "updateEnergy" }),
        })

        if (response.ok) {
          const data = await response.json()
          setEnergy(data.user.energy)
          updateUser(data.user)
        }
      } catch (error) {
        console.error("Failed to update energy:", error)
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [user, updateUser])

  const handleTap = async () => {
    if (!user || energy === 0 || isTapping) return

    setIsTapping(true)
    try {
      const response = await fetch("/api/tap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setCoins(data.user.coins)
        setEnergy(data.user.energy)
        updateUser(data.user)
      } else {
        const error = await response.json()
        alert(error.error || "Failed to tap")
      }
    } catch (error) {
      console.error("Tap failed:", error)
      // Optimistic update for better UX
      if (energy > 0) {
        setCoins((prev) => prev + 1)
        setEnergy((prev) => prev - 1)
      }
    } finally {
      setIsTapping(false)
    }
  }

  const handleClaim = async () => {
    if (!user || coins === 0) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          coins: coins,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCoins(0)
        updateUser({ ...user, coins: 0, totalClaimed: data.userTotalClaimed })
        alert(`Successfully claimed ${data.totalClaimed} TCL tokens!`)
      } else {
        alert("Failed to claim coins: " + data.error)
      }
    } catch (error) {
      console.error("Claim failed:", error)
      alert("Failed to claim coins. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const energyPercentage = (energy / 100) * 100

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">TapCloud</h1>
        <p className="text-sm text-gray-600 mb-4">Welcome, {user?.username || "Player"}!</p>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-2xl font-bold text-blue-600">TCL: {coins}</p>
          {user?.totalClaimed && user.totalClaimed > 0 && (
            <p className="text-sm text-gray-500">Total Claimed: {user.totalClaimed}</p>
          )}
        </div>
      </div>

      {/* Energy Bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Energy</span>
          <span className="text-sm text-gray-500">{energy}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${energyPercentage}%` }}
          />
        </div>
      </div>

      {/* Tap Button */}
      <button
        onClick={handleTap}
        disabled={energy === 0 || isTapping}
        className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-3xl font-bold shadow-lg disabled:from-gray-300 disabled:to-gray-400 active:scale-95 transition-all duration-150 hover:shadow-xl"
      >
        {isTapping ? "..." : energy === 0 ? "⚡" : "TAP"}
      </button>

      {energy === 0 && <p className="text-sm text-gray-500 text-center">Energy depleted! Wait for regeneration...</p>}

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={coins === 0 || isLoading}
        className="w-full max-w-xs py-3 px-4 bg-green-500 text-white rounded-lg font-semibold disabled:bg-gray-300 hover:bg-green-600 transition-colors"
      >
        {isLoading ? "Claiming..." : `Claim ${coins} TCL`}
      </button>

      {/* Stats */}
      <div className="text-center text-sm text-gray-600">
        <p>
          Wallet: {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
        </p>
      </div>
    </div>
  )
}
