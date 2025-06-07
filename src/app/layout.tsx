import type React from "react"
import "./globals.css"

export const metadata = {
  title: "TapCloud",
  description: "Tap to earn tokens",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
