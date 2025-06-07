"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@worldcoin/mini-apps-ui-kit-react"

const MAX_ENERGY = 500
const ENERGY_INTERVAL_MS = 5000

interface TapToEarnProps {
  coins: number
  setCoins: React.Dispatch<React.SetStateAction<number>>
}

export default function TapToEarn({ coins, setCoins }: TapToEarnProps) {
  const [energy, setEnergy] = useState(MAX_ENERGY)
  const [loading, setLoading] = useState(true)

  const nullifierHash = typeof window !== "undefined" ? localStorage.getItem("nullifierHash") : null

  // Ambil data awal dari server
  useEffect(() => {
    if (!nullifierHash) return

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/claim?nullifierHash=${nullifierHash}`)
        const data = await res.json()
        if (data.success) {
          setCoins(data.coins) // pakai setCoins dari props
          setEnergy(data.energy)
        }
      } catch (err) {
        console.error("Failed to load user data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [nullifierHash, setCoins])

  // Regenerasi energy tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => {
        if (prev < MAX_ENERGY) {
          const newEnergy = prev + 1
          // Sync ke server
          fetch("/api/energy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nullifierHash, energy: newEnergy }),
          })
          return newEnergy
        }
        return prev
      })
    }, ENERGY_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [nullifierHash])

  const handleTap = useCallback(async () => {
    if (!nullifierHash || energy <= 0) return

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nullifierHash, amount: 1 }),
      })
      const data = await res.json()

      if (data.success) {
        setCoins(data.walletBalance) // pakai setCoins dari props
        setEnergy((prev) => prev - 1)
      } else {
        console.error(data.error)
      }
    } catch (err) {
      console.error("Tap error:", err)
    }
  }, [energy, nullifierHash, setCoins])

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm bg-white dark:bg-black shadow-md rounded-2xl p-4">
      <p className="text-sm text-gray-500">
        Energy: {energy}/{MAX_ENERGY}
      </p>
      <p className="text-sm text-gray-500">Coins: {coins}</p>
      <Button onClick={handleTap} disabled={energy === 0}>
        Tap ☁️
      </Button>
    </div>
  )
}
