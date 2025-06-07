"use client"
import { walletAuth } from "@/auth/wallet"
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react"
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider"
import { useCallback, useState } from "react"

export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false)
  const { isInstalled } = useMiniKit()

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) {
      return
    }
    setIsPending(true)
    try {
      await walletAuth()
    } catch (error) {
      console.error("Wallet authentication error", error)
    } finally {
      setIsPending(false)
    }
  }, [isInstalled, isPending])

  return (
    <LiveFeedback
      label={{
        failed: "Failed to login",
        pending: "Logging in",
        success: "Logged in",
      }}
      state={isPending ? "pending" : undefined}
    >
      <Button onClick={onClick} disabled={isPending || !isInstalled} size="lg" variant="primary">
        Sign in with World App
      </Button>
    </LiveFeedback>
  )
}
