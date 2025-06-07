"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Page } from "@/components/PageLayout"
import { Marble, TopBar } from "@worldcoin/mini-apps-ui-kit-react"
import Image from "next/image"
import TapToEarn from "@/components/TapToEarn"
import { claimTCL } from "@/lib/actions/claimTCL"

export default function Home() {
  const { data: session } = useSession()
  const [coins, setCoins] = useState(0)

  // Load coins dari localStorage saat mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("tapcloud_coins")
    if (savedCoins) {
      setCoins(Number(savedCoins))
    }
  }, [])

  // Simpan coins ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem("tapcloud_coins", coins.toString())
  }, [coins])

  const handleClaim = async () => {
    try {
      await claimTCL(coins) // ✅ kirim coins dari client
      setCoins(0)
      localStorage.setItem("tapcloud_coins", "0")
    } catch (error) {
      console.error("Failed to claim:", error)
    }
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="TapCloud"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">{session?.user?.username ?? "Guest"}</p>
              <Marble src={session?.user?.profilePictureUrl ?? ""} className="w-12" />
            </div>
          }
        />
      </Page.Header>

      <Page.Main className="flex flex-col items-center justify-start pt-8 p-4 mb-16">
        <p className="text-xl font-bold mb-2">TCL: {coins}</p>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await handleClaim()
          }}
          className="active:scale-95 transition-transform duration-150"
        >
          <button type="submit" className="focus:outline-none">
            <Image src="/logo.png" alt="Tap to earn" width={120} height={120} className="rounded-full shadow-md" />
          </button>
        </form>

        <div className="mt-6 w-full max-w-sm">
          <TapToEarn coins={coins} setCoins={setCoins} />
        </div>

        <div className="flex gap-4 text-sm text-gray-500 mt-8">
          <a href="/privacy" className="underline hover:text-gray-800">
            Privacy
          </a>
          <a href="/terms" className="underline hover:text-gray-800">
            Terms
          </a>
        </div>
      </Page.Main>
    </>
  )
}
