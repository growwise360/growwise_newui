import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { absoluteSiteUrl } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { CONTACT_INFO } from '@/lib/constants'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const metadata = generateMetadataFromPath('/terms-conditions', locale)
  return metadata || { 
    title: 'Terms & Conditions | GrowWise', 
    description: 'GrowWise Terms & Conditions - Effective Date: 25-May-2026' 
  }
}

export default async function TermsConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Terms & Conditions', url: absoluteSiteUrl('/terms-conditions', locale, baseUrl) },
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F396D] mb-4">Terms & Conditions</h1>
            <p className="text-gray-600 mb-8">
              <strong>Effective Date: 25-May-2026</strong>
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Welcome to GrowWise! These Terms & Conditions (&quot;Terms&quot;) govern your use of our website, services, and products. By accessing or using our website or services, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing or using our website or services, you agree to these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must discontinue use of our website and services immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">2. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our website or services after any changes indicates your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">3. Use of Services</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Eligibility:</strong> You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this age requirement.
                  </li>
                  <li>
                    <strong>Account Registration:</strong> To access certain features of our services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </li>
                  <li>
                    <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">4. Payment and Refunds</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Payment:</strong> Fees for courses, programs, and other services must be paid in full at the time of registration unless otherwise specified. We accept various payment methods as indicated on our website.
                  </li>
                  <li>
                    <strong>Refund Policy:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>There is no refund policy for Grades 1-12 Math and English subjects.</li>
                      <li>Coding courses have a refund policy if students withdraw within one week after enrollment.</li>
                      <li>
                        For recurring enrollments or ongoing subjects, a written 30-day advance notice is required for cancellation. Fees accrued or billed during this 30-day notice period are non-refundable, and the student may continue attending classes through the end of the paid notice period.
                      </li>
                      <li><strong>No refunds will be issued for any purchased summer camp programs.</strong></li>
                      <li>Registration fees are non-refundable for all classes.</li>
                    </ul>
                    <p className="mt-2 text-[#F16112] font-semibold">
                      <strong>Note: Please note that registration fees are non-refundable for all classes.</strong>
                    </p>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">5. Special Education, IEP, and Section 504 Plans</h2>
                <p className="text-gray-700 mb-4">
                  GrowWise School is a private supplemental tutoring and STEAM learning center. We are not a special education provider, and our programs, instructors, and facilities are not designed, staffed, or equipped to implement Individualized Education Programs (IEPs), Section 504 accommodation plans, or other formal special-education or disability-related service plans.
                </p>
                <p className="text-gray-700 mb-4">
                  While we strive to maintain a welcoming environment, we do not provide specialized instruction, behavioral intervention, related services (such as speech, occupational, or behavioral therapy), or legally mandated accommodations associated with IEP or 504 plans.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Parent/guardian obligation:</strong> By enrolling a student, you represent that you have disclosed any IEP, 504 plan, diagnosed learning disability, or other special-education designation to GrowWise in writing prior to enrollment. Failure to disclose such information may result in discontinuation of services without refund, to the extent permitted by law.
                </p>
                <p className="text-gray-700 mb-4">
                  If a student requires accommodations, behavioral support, or staffing ratios beyond what GrowWise&apos;s standard student-to-teacher model can safely provide, GrowWise reserves the right to meet with parents or guardians to assess whether the learning environment remains safe and appropriate for the student and other participants. This process is intended to be collaborative and resource-based—not discriminatory—and may result in referral to specialized providers when GrowWise cannot meet documented needs.
                </p>
                <p className="text-gray-700 mb-4">
                  Nothing in this section limits GrowWise&apos;s obligation to provide reasonable accommodations within the scope of its supplemental tutoring model where feasible; however, GrowWise is not a special-education provider and does not implement IEP or Section 504 plans.
                </p>
                <p className="text-gray-700">
                  We strongly encourage families whose children have IEPs, 504 plans, or documented special-education needs to consult school districts, regional centers, or licensed special-education providers who are qualified to deliver the required services and accommodations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">6. Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Ownership:</strong> All content, materials, and intellectual property on our website and services are the property of GrowWise or its licensors. You may not use, reproduce, distribute, or create derivative works of such content without our express written permission.
                  </li>
                  <li>
                    <strong>Trademarks:</strong> All trademarks, logos, and service marks displayed on our website and services are the property of GrowWise or their respective owners. You are not permitted to use these marks without prior written consent from the owner.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">7. Prohibited Conduct</h2>
                <p className="text-gray-700 mb-2">You agree not to engage in any of the following prohibited activities:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Violating any applicable laws or regulations.</li>
                  <li>Infringing upon the intellectual property rights of others.</li>
                  <li>Engaging in fraudulent or deceptive practices.</li>
                  <li>Interfering with the operation of our website or services.</li>
                  <li>Posting or transmitting any harmful or offensive content.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law, GrowWise shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of our website or services.
                </p>
                <p className="text-gray-700">
                  GrowWise is likewise not liable for academic or programmatic outcomes arising from undisclosed or unsupported special-education needs as described in Section 5.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">9. Disclaimer of Educational Outcomes</h2>
                <p className="text-gray-700">
                  GrowWise provides supplemental educational instruction, enrichment, and tutoring aligned with academic benchmarks. Educational progress relies on student engagement, attendance, and prior academic foundation. GrowWise makes no guarantees, warranties, or representations—express or implied—regarding specific classroom grades, GPA improvements, standardized test scores (including but not limited to SAT, ACT, AP, or NWEA MAP), or specific school placement outcomes. All educational services and materials are provided on an &quot;as-is&quot; basis.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">10. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to indemnify and hold harmless GrowWise, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use of our website or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">11. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms are governed by and construed by the laws of the State of California, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Alameda County, California for the resolution of any disputes arising from these Terms or your use of our website or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F396D] mb-4">12. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms, please contact us:
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
