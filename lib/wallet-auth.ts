import { signIn } from "next-auth/react"

export const walletAuth = async () => {
  // Mock wallet authentication
  const mockWalletAddress = "0x" + Math.random().toString(16).substring(2, 10).padStart(8, "0")
  const mockUsername = "Player" + Math.floor(Math.random() * 1000)
  const mockProfilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUsername}`
  const mockNullifierHash = "nullifier_" + Math.random().toString(36).substring(7)

  await signIn("credentials", {
    walletAddress: mockWalletAddress,
    username: mockUsername,
    profilePictureUrl: mockProfilePicture,
    nullifierHash: mockNullifierHash,
    redirect: true,
    callbackUrl: "/game",
  })
}
