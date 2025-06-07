"use client"

import type React from "react"

import { signIn } from "next-auth/react"
import { useState } from "react"

export const AuthForm = () => {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn("credentials", {
        username,
        redirect: true,
        callbackUrl: "/game",
      })
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your username"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !username}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
