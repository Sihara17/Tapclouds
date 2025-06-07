import { TapGame } from "@/components/tap-game"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function GamePage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome, {session.user?.name}</h1>
        <p className="text-gray-600">Start tapping to earn TCL tokens!</p>
      </div>
      <TapGame />
    </main>
  )
}
