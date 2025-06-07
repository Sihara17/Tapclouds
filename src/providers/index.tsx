"use client"
import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface ClientProvidersProps {
  children: ReactNode
  session: Session | null
}

export default function ClientProviders({ children, session }: ClientProvidersProps) {
  return (
    <MiniKitProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </MiniKitProvider>
  )
}
