import type React from "react"
import { auth } from "@/auth"
import { Navigation } from "@/components/navigation"
import { Page } from "@/components/page-layout"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <Page>
      {children}
      <Page.Footer className="px-0 fixed bottom-0 w-full bg-white border-t">
        <Navigation />
      </Page.Footer>
    </Page>
  )
}
