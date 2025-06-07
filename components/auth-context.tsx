"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  walletAddress: string
  username: string
  profilePictureUrl: string
  nullifierHash: string
  coins: number
  energy: number
  lastEnergyUpdate: Date
}

interface AuthContextType {
  user: User | null
  login: (userData: Omit<User, "id" | "coins" | "energy" | "lastEnergyUpdate">) => Promise<void>
  logout: () => void
  updateUser: (userData: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("tapcloud_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("tapcloud_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (userData: Omit<User, "id" | "coins" | "energy" | "lastEnergyUpdate">) => {
    setIsLoading(true)
    try {
      // Create or get user from database
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem("tapcloud_user", JSON.stringify(data.user))
      } else {
        throw new Error("Failed to create user")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tapcloud_user")
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem("tapcloud_user", JSON.stringify(userData))
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
