"use client"

import { useState } from "react"
import { useAuth } from "./auth-context"
import { useRouter } from "next/navigation"

export const WorldIDAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleWorldIDVerification = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate World ID verification
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock verification success
      setIsVerified(true)
      setIsLoading(false)
    } catch (error) {
      setError("Verification failed")
      setIsLoading(false)
    }
  }

  const handleWalletAuth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create mock user data
      const mockUser = {
        id: "user_" + Math.random().toString(36).substring(7),
        walletAddress: "0x" + Math.random().toString(16).substring(2, 10).padStart(8, "0"),
        username: "Player" + Math.floor(Math.random() * 1000),
        profilePictureUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=player${Math.floor(Math.random() * 1000)}`,
        nullifierHash: "nullifier_" + Math.random().toString(36).substring(7),
      }

      // Login user
      login(mockUser)

      // Redirect to game
      router.push("/game")
    } catch (error) {
      setError("Authentication failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to TapCloud</h1>
        <p className="text-gray-600 mb-6">
          Verify your humanity with World ID and connect your wallet to start playing
        </p>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {!isVerified ? (
          <button
            onClick={handleWorldIDVerification}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify with World ID"}
          </button>
        ) : (
          <button
            onClick={handleWalletAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-lg font-semibold disabled:bg-gray-300 hover:bg-green-600 transition-colors"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}

        {isVerified && <div className="text-center text-green-600 text-sm">✓ Verified with World ID</div>}
      </div>
    </div>
  )
}
