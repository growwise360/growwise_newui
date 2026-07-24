import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema } from '@/lib/seo/structuredData'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { getS3ImageUrl } from '@/lib/constants'
import { ArrowLeft, Calendar, User, Code, TrendingUp, Target, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { LegacyBlogAeoBlock, LegacyBlogAeoJsonLd } from '@/components/blogs/LegacyBlogAeoBlock'

// Image path - update this to your actual image location
// Option 1: Local image in public folder: '/images/blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers.webp'
// Option 2: S3 image: getS3ImageUrl('images/blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers.webp')
const BLOG_IMAGE_URL = '/images/blogs/coding-in-python.jpg.webp'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  return { 
    title: 'Python for Future-Ready Students | GrowWise', 
    description: 'See why Python is a practical first language for students building automation, data, AI, web tools, and portfolio-ready projects.',
    alternates: {
      canonical: absoluteSiteUrl('/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers', locale, baseUrl)
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: 'Why Python Is a Strong First Language for Future-Ready Students', url: absoluteSiteUrl('/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers', locale, baseUrl) },
  ]

  const pageUrl = absoluteSiteUrl('/growwise-blogs/why-learning-python-is-your-fast-track-to-in-demand-job-offers', locale, baseUrl)
  const articleSchema = generateArticleSchema({
    headline: 'Why Python Is a Strong First Language for Future-Ready Students',
    description: 'Why Python helps students move from first scripts to real projects in automation, data, AI, and web tools.',
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: '2024-10-18',
    dateModified: '2024-10-18',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegacyBlogAeoJsonLd slug="why-learning-python-is-your-fast-track-to-in-demand-job-offers" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt="Why Learning Python is Your Fast Track to In-Demand Job Offers"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Why Python Is a Strong First Language for Future-Ready Students
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
                <span>March 10, 2025</span>
              </div>
            </div>
          
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              
              <p className="lead text-xl text-gray-700 mb-8">
                Python is one of the strongest first text-based languages for students because it is readable, practical, and useful across many project types. A child can start with simple scripts, then grow into data, AI, automation, games, and web tools.
              </p>

              <LegacyBlogAeoBlock slug="why-learning-python-is-your-fast-track-to-in-demand-job-offers" />

              <p className="text-gray-700 mb-8">
                The parent job is to choose a language that builds confidence quickly without trapping the student in toy-only coding. Python does that well because students can see useful results early.
              </p>

              <p className="text-gray-700 mb-6 text-sm">
                Kids and teens practice it in our 
                <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  Python summer camps
                </Link> each season.
              </p>

              {/* Featured Image */}
              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Why Learning Python is Your Fast Track to In-Demand Job Offers"
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  Python gives students a readable path from beginner logic to useful AI, data, automation, and web projects.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Why Python Works Well for Students</h2>

              <p className="text-gray-700 mb-6">
                Python's popularity is not just a job-market trend. It works for students because it connects beginner logic to real projects:
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Code className="w-8 h-8 text-[#1F396D] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Data Science & Analytics</h3>
                  <p className="text-gray-700 text-sm">
                    Python is the go-to language for data analysis, machine learning, and AI development.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <Briefcase className="w-8 h-8 text-[#F16112] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Web Development</h3>
                  <p className="text-gray-700 text-sm">
                    Frameworks like Django and Flask make Python perfect for building scalable web applications.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Automation & Scripting</h3>
                  <p className="text-gray-700 text-sm">
                    Python excels at automating repetitive tasks and streamlining workflows.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <Target className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">AI & Machine Learning</h3>
                  <p className="text-gray-700 text-sm">
                    Libraries like TensorFlow and PyTorch make Python essential for AI development.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">What Students Can Build with Python</h2>

              <p className="text-gray-700 mb-6">
                Python gives students multiple directions to explore before they have to choose a college or career path:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-8">
                <li><strong>Automation scripts</strong> - small tools that save time or organize information</li>
                <li><strong>Data projects</strong> - charts, analysis, and simple prediction models</li>
                <li><strong>AI experiments</strong> - basic models, prompts, and responsible AI workflows</li>
                <li><strong>Games and simulations</strong> - interactive logic that makes debugging visible</li>
                <li><strong>Web tools</strong> - simple apps that connect code to real users</li>
              </ul>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8 text-center">
                <p className="text-xl font-bold mb-4">
                  Help Your Child Start with a Practical Coding Language
                </p>
                <p className="mb-6">
                  GrowWise helps students learn Python through small-group instruction, projects, and confidence-building practice.
                </p>
                <Link href={publicPath('/future-skills/python-certification', locale)}>
                  <Button className="bg-white text-[#1F396D] hover:bg-gray-100 text-lg px-8 py-6">
                    Explore Python Pathway
                  </Button>
                </Link>
              </div>

            </div>

            {/* Program Callout */}
            <div className="mt-8 p-6 bg-[#1F396D]/5 border border-[#1F396D]/20 rounded-xl">
              <p className="text-gray-700 leading-relaxed">
                Want to put Python skills into practice?{' '}
                <Link href={publicPath('/future-skills/python-certification', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  Explore the Python certification pathway
                </Link>{' '}
                — hands-on projects, small groups, Grades 1–12 in Dublin, CA.
              </p>
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
