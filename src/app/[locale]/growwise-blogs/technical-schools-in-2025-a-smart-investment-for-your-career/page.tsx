import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema } from '@/lib/seo/structuredData'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { getS3ImageUrl } from '@/lib/constants'
import { ArrowLeft, Calendar, User, GraduationCap, TrendingUp, Target, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { LegacyBlogAeoBlock, LegacyBlogAeoJsonLd } from '@/components/blogs/LegacyBlogAeoBlock'

// Image path - update this to your actual image location
// Option 1: Local image in public folder: '/images/blogs/technical-schools-in-2025-a-smart-investment-for-your-career.webp'
// Option 2: S3 image: getS3ImageUrl('images/blogs/technical-schools-in-2025-a-smart-investment-for-your-career.webp')
const BLOG_IMAGE_URL = '/images/blogs/technical-schools.jpg.webp' // or use getS3ImageUrl('images/blogs/technical-schools-in-2025-a-smart-investment-for-your-career.webp') for S3

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  return { 
    title: 'Technical Skills for Students | GrowWise', 
    description: 'See why technical skills help students build confidence, portfolio evidence, and future-ready habits before college or career decisions.',
    alternates: {
      canonical: absoluteSiteUrl('/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career', locale, baseUrl)
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: 'Technical Skills in 2025: Why Students Should Start Before College', url: absoluteSiteUrl('/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career', locale, baseUrl) },
  ]

  const pageUrl = absoluteSiteUrl('/growwise-blogs/technical-schools-in-2025-a-smart-investment-for-your-career', locale, baseUrl)
  const articleSchema = generateArticleSchema({
    headline: 'Technical Skills in 2025: Why Students Should Start Before College',
    description: 'Explore why technical education and coding skills help students build practical confidence before college or career decisions.',
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: '2025-03-12',
    dateModified: '2025-03-12',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegacyBlogAeoJsonLd slug="technical-schools-in-2025-a-smart-investment-for-your-career" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt="Technical skills before college for future-ready students"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Technical Skills in 2025: Why Students Should Start Before College
            </h1>

            <Link 
              href="/growwise-blogs" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
            <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Anshika Verma</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2025</span>
              </div>
            </div>
          
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              
              <p className="lead text-xl text-gray-700 mb-8">
                Parents do not need to wait until college to help a child explore technical skills. In 2025, coding, AI, design, and hands-on technical projects give students a way to test interests, build confidence, and create proof of what they can do.
              </p>

              <LegacyBlogAeoBlock slug="technical-schools-in-2025-a-smart-investment-for-your-career" />

              <p className="text-gray-700 mb-8">
                The real job for parents is not choosing a career for a child. It is giving them enough structured exposure to discover what they enjoy, what they are good at, and what kind of future work feels possible.
              </p>

              <p className="text-gray-700 mb-6 text-sm">
                Grades 3–12 students can preview similar skills in our
                <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  summer skill-building programs
                </Link> before college.
              </p>

              {/* Featured Image */}
              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Technical skills before college for future-ready students"
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  Technical skill-building helps students explore interests, build confidence, and create proof before college.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Why Technical Skills Matter Before College</h2>

              <p className="text-gray-700 mb-6">
                Technical learning helps students make progress on three parent jobs at once: confidence, direction, and proof of skill.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#1F396D] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Direction</h3>
                  <p className="text-gray-700 text-sm">
                    Students learn what coding, AI, design, and technical problem solving actually feel like before choosing a path.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <Briefcase className="w-8 h-8 text-[#F16112] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Project Evidence</h3>
                  <p className="text-gray-700 text-sm">
                    Finished projects show effort and ability more clearly than a vague interest in technology.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <Target className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Future Readiness</h3>
                  <p className="text-gray-700 text-sm">
                    Students practice persistence, debugging, and structured thinking they can use in school and later careers.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">What Strong Student Technical Programs Offer</h2>

              <p className="text-gray-700 mb-6">
                For younger learners, the strongest technical programs provide:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-8">
                <li><strong>Hands-on learning</strong> with real-world projects</li>
                <li><strong>Age-appropriate foundations</strong> before advanced tools</li>
                <li><strong>Instructor feedback</strong> when a student gets stuck</li>
                <li><strong>Portfolio evidence</strong> through finished projects</li>
                <li><strong>Small-group structure</strong> that keeps students accountable</li>
              </ul>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8 text-center">
                <p className="text-xl font-bold mb-4">
                  Help Your Child Build Future-Ready Technical Confidence
                </p>
                <p className="mb-6">
                  GrowWise helps students explore coding, AI, design, and project-based technical skills before big school or career decisions arrive.
                </p>
                <Link href={publicPath('/future-skills', locale)}>
                  <Button className="bg-white text-[#1F396D] hover:bg-gray-100 text-lg px-8 py-6">
                    Explore Future Skills
                  </Button>
                </Link>
              </div>

            </div>

            {/* Back to Blogs Link */}
            <div className="mt-8 text-center">
              <Link 
                href="/growwise-blogs" 
                className="inline-flex items-center text-[#F16112] hover:text-[#F1894F] font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Blogs
              </Link>
            </div>
          </div>
        </article>

        <BlogPostConversionSection
          locale={locale}
          programHref="/future-skills"
          programLabel="Explore Future Ready Skills Pathways"
        />
      </div>
    </>
  )
}
