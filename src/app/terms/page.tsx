import { Page } from "@/components/page-layout"

export default function TermsPage() {
  return (
    <Page>
      <Page.Main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">Welcome to TapCloud. These Terms of Service govern your use of our application.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Use of the App</h2>
        <p className="mb-4">
          By using TapCloud, you agree to play fairly and refrain from exploiting bugs or reverse engineering the
          platform. Tap-to-earn features are designed for entertainment purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Eligibility</h2>
        <p className="mb-4">
          You must be at least 13 years old to use this app. By using TapCloud, you confirm that you meet this age
          requirement.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Virtual Coins</h2>
        <p className="mb-4">
          TCL coins earned through gameplay are virtual tokens with no real-world monetary value. They are for
          entertainment purposes only.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms of Service from time to time. Continued use of the app after changes means you agree
          to the new terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at:
          <br />
          <a href="mailto:legal@tapcloud.app" className="text-blue-600 underline">
            legal@tapcloud.app
          </a>
        </p>
      </Page.Main>
    </Page>
  )
}
