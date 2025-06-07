// In-memory storage for user data
interface StoredUser {
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
  lastClaimAt?: string
}

// In-memory storage using Map
const userStorage = new Map<string, StoredUser>()

// Create a new user
export async function createUser(userData: StoredUser): Promise<StoredUser> {
  userStorage.set(userData.id, userData)
  return userData
}

// Get user by ID
export async function getUser(userId: string): Promise<StoredUser | null> {
  return userStorage.get(userId) || null
}

// Update user data
export async function updateUser(userId: string, updates: Partial<StoredUser>): Promise<StoredUser> {
  const existingUser = userStorage.get(userId)
  if (!existingUser) {
    throw new Error("User not found")
  }

  const updatedUser = { ...existingUser, ...updates }
  userStorage.set(userId, updatedUser)
  return updatedUser
}

// Get all users
export async function getAllUsers(): Promise<StoredUser[]> {
  return Array.from(userStorage.values())
}

// Delete user (optional)
export async function deleteUser(userId: string): Promise<boolean> {
  return userStorage.delete(userId)
}

// Clear all users (optional, for testing)
export async function clearAllUsers(): Promise<void> {
  userStorage.clear()
}

// Get user count
export async function getUserCount(): Promise<number> {
  return userStorage.size
}
