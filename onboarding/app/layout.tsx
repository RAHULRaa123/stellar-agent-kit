import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Orbit Onboarding — Stellar | Choose your path",
  description:
    "A unified Stellar onboarding experience. New to crypto, developer, or enterprise — find the right resources for your journey on Stellar.",
  openGraph: {
    title: "Orbit Onboarding — Stellar",
    description: "Choose your path to join the future of decentralized finance on Stellar.",
  },
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
