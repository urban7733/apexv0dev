"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Starfield background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/70">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-white/80 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, use our services,
                or contact us. This may include your name, email address, and any content you upload for verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-white/80 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions,
                send communications, and comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-white/80 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-white/80 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p className="text-white/80 leading-relaxed">
                We retain your information for as long as necessary to provide our services and fulfill the purposes
                outlined in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-white/80 leading-relaxed">
                You have the right to access, update, or delete your personal information. You may also opt out of
                certain communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <p className="text-white/80 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide
                personalized content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
              <p className="text-white/80 leading-relaxed">
                Our service may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p className="text-white/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-white/80 leading-relaxed">
                If you have any questions about this privacy policy, please contact us through our website.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">Located in San Francisco, CA</p>
        </div>
      </div>
    </div>
  )
}
