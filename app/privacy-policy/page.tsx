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
          <p className="text-white/70">Effective Date: December 21, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">1. Information We Collect</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We collect information you provide directly to us, including when you create an account, use our
                  services, upload content for verification, or contact us for support.
                </p>
                <p>
                  <strong>Personal Information:</strong> Name, email address, account credentials, and any content you
                  voluntarily provide.
                </p>
                <p>
                  <strong>Usage Information:</strong> Information about how you use our service, including verification
                  requests, timestamps, and interaction patterns.
                </p>
                <p>
                  <strong>Technical Information:</strong> IP address, browser type, device information, and other
                  technical identifiers necessary for service operation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">2. How We Use Your Information</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our deepfake detection services</li>
                  <li>Process and analyze uploaded content for verification purposes</li>
                  <li>Communicate with you about our services, updates, and support</li>
                  <li>Protect against fraud, abuse, and security threats</li>
                  <li>Comply with legal obligations and enforce our terms of service</li>
                  <li>Develop and improve our AI detection algorithms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  explicit consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or valid legal requests</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                  <li>With trusted service providers who assist in our operations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">4. Data Security</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. We cannot
                  guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">5. Data Retention</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We retain your personal information for as long as necessary to provide our services and fulfill the
                  purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                </p>
                <p>
                  Uploaded content for verification is typically processed and then securely deleted within 30 days,
                  unless you explicitly request longer retention for your records.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">6. Your Privacy Rights</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to your personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your data in a portable format
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Opt out of certain data processing activities
                  </li>
                  <li>
                    <strong>Restriction:</strong> Request restriction of processing in certain circumstances
                  </li>
                </ul>
                <p>To exercise these rights, please contact us through our website contact form.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">7. Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  provide personalized content. You can control cookie settings through your browser preferences.
                </p>
                <p>
                  We may use both session cookies (which expire when you close your browser) and persistent cookies
                  (which remain on your device until deleted) for various purposes including authentication,
                  preferences, and analytics.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">8. Third-Party Services</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Our service may contain links to third-party websites or integrate with third-party services. We are
                  not responsible for the privacy practices of these third parties. We encourage you to review their
                  privacy policies before providing any personal information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">9. Children's Privacy</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected personal information
                  from a child under 13, we will take steps to delete such information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">10. International Data Transfers</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure that
                  such transfers comply with applicable data protection laws and implement appropriate safeguards to
                  protect your information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">11. Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We may update this privacy policy from time to time to reflect changes in our practices or applicable
                  laws. We will notify you of any material changes by posting the updated policy on our website and
                  updating the "Effective Date" at the top of this policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">12. Contact Information</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  If you have any questions, concerns, or requests regarding this privacy policy or our data practices,
                  please contact us through our website contact form.
                </p>
                <p>We are committed to resolving any privacy-related concerns in a timely and transparent manner.</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-lg font-light">Located in San Francisco, CA</p>
        </div>
      </div>
    </div>
  )
}
