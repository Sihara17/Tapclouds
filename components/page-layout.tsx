import type { ReactNode } from "react"

export const Page = ({ children }: { children: ReactNode }) => {
  return <div className="flex min-h-screen flex-col">{children}</div>
}

Page.Header = ({ children }: { children: ReactNode }) => {
  return <header className="bg-white p-4 border-b">{children}</header>
}

Page.Main = ({ children }: { children: ReactNode }) => {
  return <main className="flex-grow p-4">{children}</main>
}

Page.Footer = ({ children }: { children: ReactNode }) => {
  return <footer className="bg-white p-4 border-t">{children}</footer>
}
