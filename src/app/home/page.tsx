import { TapGame } from "@/components/tap-game"
import { Page } from "@/components/page-layout"
import { Navigation } from "@/components/navigation"

export default function GamePage() {
  return (
    <Page>
      <Page.Main className="flex items-center justify-center">
        <TapGame />
      </Page.Main>
      <Page.Footer>
        <Navigation />
      </Page.Footer>
    </Page>
  )
}
