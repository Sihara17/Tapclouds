import { Game } from "@/components/game"
import { Page } from "@/components/page-layout"

export default function HomePage() {
  return (
    <Page>
      <Page.Main className="flex items-center justify-center bg-gray-50">
        <Game />
      </Page.Main>
    </Page>
  )
}
