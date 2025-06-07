import { Page } from "@/components/page-layout"

export default function PrivacyPage() {
  return (
    <Page>
      <Page.Main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At TapCloud, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect
          your information when you use our app.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Username and basic profile information</li>
          <li>Game progress and coin balances (stored locally)</li>
          <li>Usage analytics to improve the app experience</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          We use your data solely to provide app features, such as managing your game progress and enabling coin claims.
          We do not sell or share your personal data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Data Storage</h2>
        <p className="mb-4">
          Most gameplay data is stored locally in your browser. We do not store sensitive personal information on our
          servers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:
          <br />
          <a href="mailto:privacy@tapcloud.app" className="text-blue-600 underline">
            privacy@tapcloud.app
          </a>
        </p>
      </Page.Main>
    </Page>
  )
}
