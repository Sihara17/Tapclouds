"use client"

import { Page } from "@/components/page-layout"
import { TapToEarn } from "@/components/tap-to-earn"
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function GamePage() {
  const { data: session } = useSession()
  const [coins, setCoins] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Load coins from localStorage on mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("tapcloud_coins")
    if (savedCoins) {
      setCoins(Number(savedCoins))
    }
  }, [])

  // Save coins to localStorage when they change
  useEffect(() => {
    localStorage.setItem("tapcloud_coins", coins.toString())
  }, [coins])

  const handleClaim = async () => {
    if (coins === 0) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins }),
      })

      const data = await res.json()

      if (data.success) {
        setCoins(0)
        localStorage.setItem("tapcloud_coins", "0")
        alert(`Successfully claimed ${data.totalClaimed} TCL coins!`)
      } else {
        alert("Failed to claim coins: " + data.error)
      }
    } catch (error) {
      console.error("Failed to claim:", error)
      alert("Failed to claim coins. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="TapCloud"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">{session?.user?.username ?? "Guest"}</p>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={session?.user?.profilePictureUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"}
                  alt="Profile"
                  width={32}
                  height={32}
                  unoptimized
                />
              </div>
            </div>
          }
        />
      </Page.Header>

      <Page.Main className="flex flex-col items-center justify-start pt-8 p-4 mb-16">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-blue-600 mb-2">TCL: {coins}</p>
          <p className="text-sm text-gray-500">Tap the button below to earn coins!</p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setCoins((prev) => prev + 1)}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg active:scale-95 transition-transform duration-150 hover:shadow-xl"
          >
            TCL
          </button>
        </div>

        <div className="w-full max-w-sm mb-6">
          <TapToEarn coins={coins} setCoins={setCoins} />
        </div>

        <button
          onClick={handleClaim}
          disabled={coins === 0 || isLoading}
          className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
        >
          {isLoading ? "Claiming..." : `Claim ${coins} TCL`}
        </button>

        <div className="flex gap-4 text-sm text-gray-500 mt-8">
          <a href="/privacy" className="underline hover:text-gray-800">
            Privacy
          </a>
          <a href="/terms" className="underline hover:text-gray-800">
            Terms
          </a>
        </div>
      </Page.Main>
    </>
  )
}
