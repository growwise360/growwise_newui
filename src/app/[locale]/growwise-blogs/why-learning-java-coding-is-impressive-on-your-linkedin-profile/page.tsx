import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema } from '@/lib/seo/structuredData'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { getS3ImageUrl } from '@/lib/constants'
import { ArrowLeft, Calendar, User, Code, Linkedin, TrendingUp, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { LegacyBlogAeoBlock, LegacyBlogAeoJsonLd } from '@/components/blogs/LegacyBlogAeoBlock'

// Image path - update this to your actual image location
// Option 1: Local image in public folder: '/images/blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile.webp'
// Option 2: S3 image: getS3ImageUrl('images/blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile.webp')
const BLOG_IMAGE_URL = '/images/blogs/learning-java-is-good-for-linkedin.jpg'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  return { 
    title: 'Java Coding for Student Profiles | GrowWise', 
    description: 'Learn why Java coding helps students show object-oriented thinking, backend foundations, and project-ready technical skill.',
    alternates: {
      canonical: absoluteSiteUrl('/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile', locale, baseUrl)
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: 'Why Java Coding Strengthens a Student Profile', url: absoluteSiteUrl('/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile', locale, baseUrl) },
  ]

  const pageUrl = absoluteSiteUrl('/growwise-blogs/why-learning-java-coding-is-impressive-on-your-linkedin-profile', locale, baseUrl)
  const articleSchema = generateArticleSchema({
    headline: 'Why Java Coding Strengthens a Student Profile',
    description: 'Java remains a powerful programming language for students who are ready for object-oriented thinking and deeper projects.',
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: '2024-11-07',
    dateModified: '2024-11-07',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegacyBlogAeoJsonLd slug="why-learning-java-coding-is-impressive-on-your-linkedin-profile" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt="Java coding projects that strengthen a student profile"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Why Java Coding Strengthens a Student Profile
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
                <span>November 8, 2024</span>
              </div>
            </div>
          
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              
              <p className="lead text-xl text-gray-700 mb-8">
                Java is not usually the first language for every child, but it can be a strong next step for students who are ready for structured, object-oriented programming. It helps learners move beyond simple scripts into larger projects that show technical maturity.
              </p>

              <LegacyBlogAeoBlock slug="why-learning-java-coding-is-impressive-on-your-linkedin-profile" />

              <p className="text-gray-700 mb-8">
                The parent job is to know when Java is worth the effort and how a student can use it to show real project ability, not just another class completed.
              </p>

              <p className="text-gray-700 mb-6 text-sm">
                Younger learners get a head start in our 
                <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  Java and coding summer camps
                </Link>.
              </p>

              {/* Featured Image */}
              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Java coding projects that strengthen a student profile"
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  Java helps ready students practice structured programming and show deeper project ability.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Why Java Is Still Relevant for Students</h2>

              <p className="text-gray-700 mb-6">
                Java continues to be valuable because it teaches habits students need for larger technical work:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Code className="w-8 h-8 text-[#1F396D] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Structured Thinking</h3>
                  <p className="text-gray-700 text-sm">
                    Java pushes students to organize code carefully and think in systems.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <Linkedin className="w-8 h-8 text-[#F16112] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">College Readiness</h3>
                  <p className="text-gray-700 text-sm">
                    Object-oriented foundations help with future computer science coursework.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Project Depth</h3>
                  <p className="text-gray-700 text-sm">
                    Java projects can show more advanced logic, architecture, and debugging.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">How Java Skills Strengthen a Student Profile</h2>

              <p className="text-gray-700 mb-6">
                Java skills become meaningful when students can point to what they built. A strong student profile shows:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-8">
                <li><strong>Object-oriented thinking</strong> through classes, methods, and data modeling</li>
                <li><strong>Problem-solving ability</strong> through debugging and multi-step logic</li>
                <li><strong>Project completion</strong> through games, tools, or backend-style applications</li>
                <li><strong>Computer science readiness</strong> for more formal coursework</li>
                <li><strong>Technical confidence</strong> that carries into future coding paths</li>
              </ul>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8 text-center">
                <p className="text-xl font-bold mb-4">
                  Help Your Child Move Beyond Beginner Coding
                </p>
                <p className="mb-6">
                  GrowWise helps students build the foundations, projects, and confidence needed for deeper programming.
                </p>
                <Link href={publicPath('/coding', locale)}>
                  <Button className="bg-white text-[#1F396D] hover:bg-gray-100 text-lg px-8 py-6">
                    Explore Coding Paths
                  </Button>
                </Link>
              </div>

            </div>

            {/* Program Callout */}
            <div className="mt-8 p-6 bg-[#1F396D]/5 border border-[#1F396D]/20 rounded-xl">
              <p className="text-gray-700 leading-relaxed">
                Ready to start coding in real languages?{' '}
                <Link href={publicPath('/future-skills/python-certification', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  Explore the Python certification pathway
                </Link>{' '}
                — Python, AI projects, and real portfolio-building for Grades 1–12 in Dublin, CA.
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
