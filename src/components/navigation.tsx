"use client"

import Link from "next/link"

export const Navigation = () => {
  return (
    <nav className="flex justify-around items-center p-4 bg-white border-t">
      <Link href="/home" className="text-blue-500 hover:text-blue-700">
        Home
      </Link>
      <Link href="/leaderboard" className="text-blue-500 hover:text-blue-700">
        Leaderboard
      </Link>
      <Link href="/profile" className="text-blue-500 hover:text-blue-700">
        Profile
      </Link>
    </nav>
  )
}
