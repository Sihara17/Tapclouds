"use client"

import Link from "next/link"
import { useAuth } from "./auth-context"

export const Navigation = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-t">
      <div className="flex gap-4">
        <Link href="/game" className="text-blue-500 hover:text-blue-700">
          Game
        </Link>
        <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700">
          Leaderboard
        </Link>
        <Link href="/profile" className="text-blue-500 hover:text-blue-700">
          Profile
        </Link>
      </div>

      {user && (
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Sign Out
        </button>
      )}
    </nav>
  )
}
