import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema } from '@/lib/seo/structuredData'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { ArrowLeft, Calendar, User, FileText, Briefcase, TrendingUp, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { LegacyBlogAeoBlock, LegacyBlogAeoJsonLd } from '@/components/blogs/LegacyBlogAeoBlock'

const BLOG_IMAGE_URL = '/images/blogs/programming-skills-resume.jpg'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  return { 
    title: 'Programming Skills for Student Profiles | GrowWise', 
    description: 'Programming skills help students show problem-solving, technical fluency, project evidence, and future-ready confidence before college.',
    alternates: {
      canonical: absoluteSiteUrl('/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities', locale, baseUrl)
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: 'How Programming Skills Strengthen Student Profiles', url: absoluteSiteUrl('/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities', locale, baseUrl) },
  ]

  const pageUrl = absoluteSiteUrl('/growwise-blogs/how-programming-skills-on-a-resume-will-open-more-career-opportunities', locale, baseUrl)
  const articleSchema = generateArticleSchema({
    headline: 'How Programming Skills Strengthen Student Profiles',
    description: 'Programming skills help students show problem-solving, technical fluency, and project evidence before college or career decisions.',
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: '2024-11-25',
    dateModified: '2024-11-25',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegacyBlogAeoJsonLd slug="how-programming-skills-on-a-resume-will-open-more-career-opportunities" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt="How Programming Skills on a Resume Will Open More Career Opportunities"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              How Programming Skills Strengthen Student Profiles
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
                <span>December 5, 2024</span>
              </div>
            </div>
          
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              
              <p className="lead text-xl text-gray-700 mb-8">
                Programming skills matter long before a student starts building an application profile. For middle and high school students, coding projects give parents, teachers, and future programs visible proof of problem-solving, persistence, and technical confidence.
              </p>

              <LegacyBlogAeoBlock slug="how-programming-skills-on-a-resume-will-open-more-career-opportunities" />

              <p className="text-gray-700 mb-8">
                The parent job is simple: help your child move from "interested in technology" to "able to build something and explain how it works."
              </p>

              <p className="text-gray-700 mb-6 text-sm">
                Students can build portfolio projects during 
                <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  summer enrichment programs
                </Link> between academic years.
              </p>

              {/* Featured Image */}
              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Programming projects that strengthen a student coding profile"
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  Programming projects give students visible proof of problem-solving, persistence, and technical fluency.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Why Programming Skills Matter for Students</h2>

              <p className="text-gray-700 mb-6">
                Programming skills demonstrate qualities that help students stand out in school, clubs, competitions, internships, and later applications:
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Target className="w-8 h-8 text-[#1F396D] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Problem-Solving Ability</h3>
                  <p className="text-gray-700 text-sm">
                    Coding shows you can break down complex problems and find solutions.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#F16112] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Technical Literacy</h3>
                  <p className="text-gray-700 text-sm">
                    Understanding technology is essential in our digital world.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <Briefcase className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Project Evidence</h3>
                  <p className="text-gray-700 text-sm">
                    A finished program shows what the student built, tested, and improved.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Builder Mindset</h3>
                  <p className="text-gray-700 text-sm">
                    Students learn to use technology to solve problems instead of only consuming it.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Where Programming Skills Can Take a Student</h2>

              <p className="text-gray-700 mb-6">
                Early coding exposure helps students explore fields before they have to choose a major or career direction:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-8">
                <li><strong>Technology</strong> - software, web development, app building, and data science</li>
                <li><strong>Science and research</strong> - data analysis, modeling, and experimentation</li>
                <li><strong>Business</strong> - automation, analytics, and digital product thinking</li>
                <li><strong>Creative work</strong> - games, interactive media, and design tools</li>
                <li><strong>School leadership</strong> - robotics teams, coding clubs, and project portfolios</li>
              </ul>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8 text-center">
                <p className="text-xl font-bold mb-4">
                  Help Your Child Build a Real Coding Portfolio
                </p>
                <p className="mb-6">
                  GrowWise helps students turn coding interest into finished projects, stronger confidence, and clearer future direction.
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
                Give your child coding skills that make future applications, projects, and student profiles stronger.{' '}
                <Link href={publicPath('/future-skills/python-certification', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  Explore the Python certification pathway
                </Link>{' '}
                — from first lines of code to AI projects, for Grades 1–12 in Dublin, CA.
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
