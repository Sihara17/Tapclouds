import { createUser, getUser, updateUser } from "./storage"

export interface User {
  id: string
  walletAddress: string
  username: string
  profilePictureUrl: string
  nullifierHash: string
  coins: number
  energy: number
  totalClaimed: number
  lastEnergyUpdate: string
  lastActivity: string
}

// Create or get user from storage
export async function createOrGetUser(userData: {
  walletAddress: string
  username: string
  profilePictureUrl: string
  nullifierHash: string
}): Promise<User> {
  try {
    // Check if user exists
    let user = await getUser(userData.walletAddress)

    if (!user) {
      // Create new user
      user = await createUser({
        id: userData.walletAddress,
        walletAddress: userData.walletAddress,
        username: userData.username,
        profilePictureUrl: userData.profilePictureUrl,
        nullifierHash: userData.nullifierHash,
        coins: 0,
        energy: 100,
        totalClaimed: 0,
        lastEnergyUpdate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      })
    } else {
      // Update existing user info
      user = await updateUser(userData.walletAddress, {
        ...user,
        username: userData.username,
        profilePictureUrl: userData.profilePictureUrl,
      })
    }

    return user
  } catch (error) {
    console.error("Error creating/getting user:", error)
    throw new Error("Failed to create or get user")
  }
}

// Update user energy based on time passed
export async function updateUserEnergy(userId: string): Promise<User> {
  try {
    const user = await getUser(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const now = new Date()
    const lastUpdate = new Date(user.lastEnergyUpdate)
    const timeDiff = now.getTime() - lastUpdate.getTime()
    const energyToAdd = Math.floor(timeDiff / (3 * 1000)) // 1 energy per 3 seconds

    const newEnergy = Math.min(100, user.energy + energyToAdd)

    const updatedUser = await updateUser(userId, {
      ...user,
      energy: newEnergy,
      lastEnergyUpdate: now.toISOString(),
    })

    return updatedUser
  } catch (error) {
    console.error("Error updating user energy:", error)
    throw new Error("Failed to update user energy")
  }
}

export const handlers = {
  GET: async () => new Response("OK"),
  POST: async () => new Response("OK"),
}

export const auth = async () => null
