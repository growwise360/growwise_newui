import { Metadata } from 'next'
import { generateMetadataFromPath } from '@/lib/seo/metadata'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import { generateArticleSchema } from '@/lib/seo/structuredData'
import Link from 'next/link'
import { BlogImage } from '@/components/blogs/BlogImage'
import { getS3ImageUrl } from '@/lib/constants'
import { ArrowLeft, Calendar, User, Code, TrendingUp, Target, Briefcase, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { absoluteSiteUrl, publicPath } from '@/lib/publicPath'
import { getCanonicalSiteUrl } from '@/lib/seo/siteUrl'
import { BlogPostConversionSection } from '@/components/blogs/BlogPostConversionSection'
import { LegacyBlogAeoBlock, LegacyBlogAeoJsonLd } from '@/components/blogs/LegacyBlogAeoBlock'

// Image path - update this to your actual image location
// Option 1: Local image in public folder: '/images/blogs/unlock-your-future-the-best-programming-languages-for-career-advancement.webp'
// Option 2: S3 image: getS3ImageUrl('images/blogs/unlock-your-future-the-best-programming-languages-for-career-advancement.webp')
const BLOG_IMAGE_URL = '/images/blogs/best-programming-language-1024x569.jpg.webp' // or use getS3ImageUrl('images/blogs/unlock-your-future-the-best-programming-languages-for-career-advancement.webp') for S3

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  return { 
    title: 'Best Coding Languages for Students | GrowWise', 
    description: 'Compare Python, JavaScript, Java, and project practice so parents can choose the right coding path for middle and high school students.',
    alternates: {
      canonical: absoluteSiteUrl('/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement', locale, baseUrl)
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = getCanonicalSiteUrl()
  
  const breadcrumbItems = [
    { name: 'Home', url: absoluteSiteUrl('/', locale, baseUrl) },
    { name: 'Blog', url: absoluteSiteUrl('/growwise-blogs', locale, baseUrl) },
    { name: 'Best Programming Languages for Students: How to Choose a Path', url: absoluteSiteUrl('/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement', locale, baseUrl) },
  ]

  const pageUrl = absoluteSiteUrl('/growwise-blogs/unlock-your-future-the-best-programming-languages-for-career-advancement', locale, baseUrl)
  const articleSchema = generateArticleSchema({
    headline: 'Best Programming Languages for Students: How to Choose a Path',
    description: 'Compare Python, JavaScript, Java, and other language choices for students building future-ready coding skills.',
    url: pageUrl,
    image: `${baseUrl}${BLOG_IMAGE_URL}`,
    datePublished: '2024-12-10',
    dateModified: '2024-12-10',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegacyBlogAeoJsonLd slug="unlock-your-future-the-best-programming-languages-for-career-advancement" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1F396D] via-[#29335C] to-[#1F396D] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Cover Image Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <BlogImage
              src={BLOG_IMAGE_URL}
              alt="Unlock Your Future: The Best Programming Languages for Career Advancement"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Best Programming Languages for Students: How to Choose a Path
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
                <span>November 20, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4:30 pm</span>
              </div>
            </div>
          
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
              
              <p className="lead text-xl text-gray-700 mb-8">
                Parents often ask which coding language a child should learn first. The honest answer depends on the student's age, confidence, and what they want to build: Python for general problem-solving and AI, JavaScript for web projects, Java for deeper computer science, and Scratch or Roblox-style tools for younger beginners.
              </p>

              <LegacyBlogAeoBlock slug="unlock-your-future-the-best-programming-languages-for-career-advancement" />

              <p className="text-gray-700 mb-8">
                The job is not to chase the trendiest language. The job is to choose a path that keeps the student challenged, supported, and able to finish real projects.
              </p>

              <p className="text-gray-700 mb-6 text-sm">
                Short intensives help students test stacks - try our 
                <Link href={publicPath('/camps/summer', locale)} className="text-[#1F396D] font-semibold underline hover:text-[#F16112]">
                  summer coding intensives
                </Link> in the Tri-Valley.
              </p>

              {/* Featured Image */}
              <figure className="not-prose my-8 overflow-hidden shadow-lg bg-gray-50">
                <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                  <BlogImage
                    src={BLOG_IMAGE_URL}
                    alt="Best programming languages for student coding goals"
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-gray-600">
                  The right first programming language depends on the student's goal, maturity, and project path.
                </figcaption>
              </figure>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Choosing the Right Path: Language by Student Goal</h2>

              <p className="text-gray-700 mb-6">
                Programming languages have distinct purposes. A student should start with the language that matches what they want to build and the level of structure they can handle.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Code className="w-8 h-8 text-[#1F396D] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Web Development</h3>
                  <p className="text-gray-700 text-sm">
                    JavaScript and TypeScript are excellent choices for building websites and web applications.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#F16112] mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Data Analysis</h3>
                  <p className="text-gray-700 text-sm">
                    Python is the sweet spot for data science, analytics, and machine learning.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <Briefcase className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Mobile Apps</h3>
                  <p className="text-gray-700 text-sm">
                    Java and Kotlin are top picks for building Android applications.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-8">
                Choosing the right language clarifies the learning path. A student who wants AI or data projects may start with Python. A student who wants websites may need JavaScript. A student preparing for deeper computer science may eventually benefit from Java or another object-oriented language.
              </p>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">How Parents Should Judge a Coding Path</h2>

              <p className="text-gray-700 mb-6">
                Do not judge a student coding path only by adult job-market lists. For K-12 students, the better question is whether the program builds durable skills:
              </p>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-6 rounded-lg my-6">
                <p className="font-semibold mb-2">Key Insight:</p>
                <p>
                  The best coding language is the one that helps the student build, debug, explain, and finish projects at the right level of challenge.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Learning Resources and Structure</h2>

              <p className="text-gray-700 mb-6">
                Students can learn from free videos and online courses, but many need structure to keep going when debugging gets hard:
              </p>

              <div className="space-y-4 my-6">
                <div className="bg-blue-50 border-l-4 border-[#1F396D] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Free Platforms</h3>
                  <p className="text-gray-700">
                    Free platforms can introduce syntax and simple exercises.
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-[#F16112] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Paid Courses</h3>
                  <p className="text-gray-700">
                    Paid courses can help motivated students follow a clearer sequence.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Bootcamps</h3>
                  <p className="text-gray-700">
                    Small-group programs add accountability, feedback, and finished projects students can explain.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">The Power of Community</h2>

              <p className="text-gray-700 mb-6">
                Students learn faster when they can ask questions, see other approaches, and get unstuck without feeling embarrassed.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg my-6">
                <h3 className="text-xl font-bold text-[#1F396D] mb-3">Online Forums and Local Groups</h3>
                <p className="text-gray-700 mb-2">
                  Older students can learn from GitHub, coding clubs, and project communities. Younger students often need a smaller, safer environment where they can practice explaining their thinking.
                </p>
                <p className="text-gray-700">
                  Finished projects are the proof. A child who can explain what they built is further along than a child who only completed lessons.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Beyond the Code: Soft Skills for Success</h2>

              <p className="text-gray-700 mb-6">
                Coding skills are important, but parents should also look for communication, planning, and persistence. Students grow when they can explain a bug, ask for help clearly, and improve a project after feedback.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Users className="w-8 h-8 text-[#1F396D] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Communication</h3>
                  <p className="text-gray-700 text-sm">
                    Essential for explaining complex concepts to non-technical stakeholders.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <Users className="w-8 h-8 text-[#F16112] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Collaboration</h3>
                  <p className="text-gray-700 text-sm">
                    Most programming is collaborative, not solitary.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-[#1F396D] mb-2">Problem-Solving</h3>
                  <p className="text-gray-700 text-sm">
                    Breaking down complex problems into manageable solutions.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Staying Ahead: Continuous Learning</h2>

              <p className="text-gray-700 mb-6">
                The tech world changes quickly. That is why students need learning habits, not only one language. The most valuable habit is being willing to try, test, revise, and keep learning.
              </p>

              <p className="text-gray-700 mb-8">
                A popular language may change, but debugging, logic, problem decomposition, and project completion remain useful across tools.
              </p>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">FAQs on The Best Programming Languages for Career Advancement</h2>

              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Which programming language is best for students?</h3>
                  <p className="text-gray-700">
                    The "best" programming language depends on what the student wants to build. Python is strong for general problem-solving, data, and AI. JavaScript is strong for web projects. Java is useful when a student is ready for object-oriented programming and deeper computer science.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Which programming language will be best in future?</h3>
                  <p className="text-gray-700">
                    Predicting the future is difficult, but versatile languages with large communities, like Python and JavaScript, remain strong choices. The bigger goal is helping students learn how to learn, debug, and build finished projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">What is the best programming language for a beginner?</h3>
                  <p className="text-gray-700">
                    For many beginners, Python is the easiest first text-based language because the syntax is readable and projects can become useful quickly. JavaScript is a good first choice for students who specifically want to build websites or browser-based projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1F396D] mb-2">Which programming language gives students the most options?</h3>
                  <p className="text-gray-700">
                    Python and JavaScript give students broad options because they connect to many project types. The best long-term advantage comes from learning one language deeply enough to build, debug, and explain finished work.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#1F396D] mt-12 mb-6">Conclusion</h2>

              <p className="text-gray-700 mb-6">
                Choosing a programming language should help a student make visible progress, not add pressure. The right path gives them a next project, a reason to keep practicing, and enough support to finish what they start.
              </p>

              <p className="text-gray-700 mb-6">
                Choosing a language is not simply picking a skill; it is choosing the kind of problems the student will practice solving. With AI changing how people work and learn, coding helps students understand and create with technology.
              </p>

              <p className="text-gray-700 mb-8">
                Start with the student's goal, match the language to that goal, and make sure the learning environment includes feedback when the project gets hard.
              </p>

              <div className="bg-gradient-to-r from-[#1F396D] to-[#F16112] text-white p-8 rounded-xl my-8 text-center">
                <p className="text-xl font-bold mb-4">
                  Help Your Child Choose the Right Coding Path
                </p>
                <p className="mb-6">
                  GrowWise helps students choose a language path, build real projects, and grow into future-ready technical confidence.
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
