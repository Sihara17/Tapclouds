import { Page } from "@/components/page-layout"
import { Navigation } from "@/components/navigation"

export default function ProfilePage() {
  return (
    <Page>
      <Page.Main>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Coming soon!</p>
      </Page.Main>
      <Page.Footer>
        <Navigation />
      </Page.Footer>
    </Page>
  )
}
