import type { ReactNode } from "react"

export const Page = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`flex min-h-screen flex-col ${className || ""}`}>{children}</div>
}

const Header = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <header className={`bg-white p-4 ${className || ""}`}>{children}</header>
}

const Main = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <main className={`flex-grow p-4 ${className || ""}`}>{children}</main>
}

const Footer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <footer className={`bg-white p-4 ${className || ""}`}>{children}</footer>
}

Page.Header = Header
Page.Main = Main
Page.Footer = Footer
