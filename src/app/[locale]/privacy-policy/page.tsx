import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { CONTACT_INFO } from '@/lib/constants'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/privacy-policy', locale)
  return metadata || { 
    title: 'Privacy Policy | GrowWise', 
    description: 'GrowWise Privacy Policy - Effective Date: 25-May-2026' 
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Privacy Policy', url: absoluteSiteUrl('/privacy-policy', locale, baseUrl) },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F396D] mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">
              <strong>Effective Date: 25-May-2026</strong>
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Thank you for visiting GrowWise. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or interact with our educational services.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">1. Information We Collect</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Personal Information:</strong> We may collect personal information such as your name, email address, phone number, and address when you register for courses, programs, or events.
                  </li>
                  <li>
                    <strong>Onsite &amp; Camp Registration Information:</strong> For in-person programs at our Dublin, CA campus and summer camps, we may collect emergency contact details, authorized pickup contacts, student health or allergy notifications, and related safety information provided by a parent or legal guardian during registration.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Payments are processed by our third-party payment processor (Stripe). We do not store full credit card numbers on our servers. Stripe may collect payment details in accordance with its own privacy policy.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We collect information about your interactions with our website and services, including IP addresses, browser types, pages visited, and timestamps.
                  </li>
                  <li>
                    <strong>Cookies &amp; Analytics:</strong> With your consent where required, we use cookies and similar technologies through services such as Google Analytics, Google Tag Manager, Microsoft Clarity, Meta (Facebook) Pixel, and HubSpot to understand site usage, measure marketing performance, and improve your experience.
                  </li>
                  <li>
                    <strong>Photo &amp; Video Consent:</strong> As part of our educational programs, workshops, and events, GrowWise may occasionally take photographs or record video clips that include participating students. These media assets may be used for the following purposes:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Educational documentation and classroom reflection</li>
                      <li>Marketing materials, including brochures and flyers</li>
                      <li>Social media posts and online advertising</li>
                      <li>Internal training and development</li>
                    </ul>
                    <p className="mt-2">
                      We respect your child&apos;s privacy and will only use photos or videos in a responsible and respectful manner. No personal details (such as full names or contact information) will be published alongside any media unless explicit, written permission has been provided.
                    </p>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">2. Children&apos;s Privacy (COPPA)</h2>
                <p className="text-gray-700">
                  Our website and services are intended for use and purchase by parents and legal guardians. We do not knowingly collect personal information directly from children under the age of 13. All student registration information, emergency contact details, and names must be provided exclusively by a parent or legal guardian. If we learn that a child under 13 has directly submitted personal data online without verifiable parental consent, we will delete that information immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-2">We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>To provide educational services and programs.</li>
                  <li>To communicate with you about courses, events, and updates.</li>
                  <li>To process payments and enrollments.</li>
                  <li>To improve our website and services.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">4. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>
                <p className="text-gray-700 mb-2">Examples of service providers we may use include:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Stripe</strong> — payment processing</li>
                  <li><strong>SendGrid</strong> — transactional and program email</li>
                  <li><strong>HubSpot</strong> — CRM and lead management</li>
                  <li><strong>Google, Meta, and Microsoft</strong> — analytics and advertising measurement (with consent where required)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">5. Security of Your Information</h2>
                <p className="text-gray-700">
                  We implement robust administrative, technical, and physical security measures to protect your data. This includes encryption for digital data and restricted physical access controls for on-premise student records, emergency contact information, and health/allergy notifications gathered during registration.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to access, correct, or delete your personal information. You may also opt out of receiving communications from us at any time.
                </p>
                <p className="text-gray-700">
                  If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA/CPRA), including the right to know what personal information we collect, request deletion or correction, and opt out of the sale or sharing of personal information. GrowWise does not sell personal information. To exercise your rights, contact us using the information in Section 9.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">8. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>GrowWise</strong></p>
                  <p className="text-gray-700 mb-2">Address: {CONTACT_INFO.address}</p>
                  <p className="text-gray-700 mb-2">Phone: {CONTACT_INFO.phone}</p>
                  <p className="text-gray-700">Email: {CONTACT_INFO.email}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
