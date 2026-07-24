import { MATH_COURSE_PATHS } from '@/lib/math-course-paths';
import { AcademicRedirectPage } from '@/lib/academic-redirect-page';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default function CoursesMathRedirectPage(props: PageProps) {
  return <AcademicRedirectPage {...props} targetPath={MATH_COURSE_PATHS.hub} />;
}
