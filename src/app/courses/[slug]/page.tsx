import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Button } from "src/components/ui/button";
import { formatSemesterCode } from "src/lib/semester";
import {
  formatCourseAvailability,
  getSampleCourseBySlug,
  sampleCourses,
} from "src/lib/sample-courses";

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type CourseDetailsProps = {
  instructorName: string;
  semester: string;
  isPublic: boolean;
  moduleCount: number;
  durationHours: number;
  className?: string;
};

const markdownComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-muted-foreground text-base leading-7" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="text-muted-foreground ml-5 list-disc space-y-2 text-base leading-7" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-foreground underline underline-offset-4"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
};

function formatModuleLabel(moduleCount: number) {
  return `${moduleCount} module${moduleCount === 1 ? "" : "s"}`;
}

function formatCourseLength(moduleCount: number, durationHours: number) {
  const hourLabel = `${durationHours} hour${durationHours === 1 ? "" : "s"}`;
  return `${formatModuleLabel(moduleCount)} (${hourLabel})`;
}

function CourseDetails({
  instructorName,
  semester,
  isPublic,
  moduleCount,
  durationHours,
  className,
}: CourseDetailsProps) {
  return (
    <div className={className}>
      <dl className="space-y-5">
        <div className="space-y-1">
          <dt className="text-muted-foreground text-sm">Instructor</dt>
          <dd className="text-base font-medium">{instructorName}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-muted-foreground text-sm">Semester</dt>
          <dd className="text-base font-medium">
            {formatSemesterCode(semester)}
          </dd>
        </div>
        <div className="space-y-1">
          <dt className="text-muted-foreground text-sm">Availability</dt>
          <dd className="text-base font-medium">
            {formatCourseAvailability(isPublic)}
          </dd>
        </div>
        <div className="space-y-1">
          <dt className="text-muted-foreground text-sm">Length</dt>
          <dd className="text-base font-medium">
            {formatCourseLength(moduleCount, durationHours)}
          </dd>
        </div>
      </dl>
      <Button
        size="lg"
        className="bg-accent text-accent-foreground hover:bg-accent/80 mt-6 h-11 w-full cursor-pointer"
      >
        Enroll in this course
      </Button>
    </div>
  );
}

export function generateStaticParams() {
  return sampleCourses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getSampleCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="from-background via-background to-muted/50 min-h-screen bg-gradient-to-b">
      <main>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          {course.titleImage ? (
            <>
              <section className="grid gap-8 lg:grid-cols-[3fr_1fr] lg:grid-rows-[minmax(0,3fr)_auto] lg:items-start lg:gap-x-12 lg:gap-y-6">
                <div className="lg:col-start-1 lg:row-start-1">
                  <div className="bg-muted/30 lg:max-w-[80%] overflow-hidden rounded-3xl">
                    <Image
                      src={course.titleImage}
                      alt={`${course.code} course image`}
                      width={1600}
                      height={900}
                      className="aspect-[16/9] h-auto w-full object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-3 lg:col-start-1 lg:row-start-2 lg:self-end">
                  <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    {course.code}
                  </h1>
                  <p className="text-muted-foreground max-w-3xl text-xl leading-tight font-medium tracking-tight sm:text-2xl">
                    {course.title}
                  </p>
                </div>

                <CourseDetails
                  className="space-y-5 lg:col-start-2 lg:row-span-2 lg:pt-2"
                  instructorName={course.instructorName}
                  semester={course.semester}
                  isPublic={course.public}
                  moduleCount={course.modules.length}
                  durationHours={course.durationHours}
                />
              </section>

              <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
                <div className="max-w-3xl space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Course description
                  </h2>
                  <div className="space-y-5">
                    <ReactMarkdown components={markdownComponents}>
                      {course.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className="grid gap-10 lg:grid-cols-[3fr_1fr] lg:gap-12">
              <div className="max-w-3xl space-y-8">
                <div className="space-y-3">
                  <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    {course.code}
                  </h1>
                  <p className="text-muted-foreground max-w-3xl text-xl leading-tight font-medium tracking-tight sm:text-2xl">
                    {course.title}
                  </p>
                </div>

                <div className="space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Course description
                  </h2>
                  <div className="space-y-5">
                    <ReactMarkdown components={markdownComponents}>
                      {course.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              <CourseDetails
                className="space-y-5 lg:pt-2"
                instructorName={course.instructorName}
                semester={course.semester}
                isPublic={course.public}
                moduleCount={course.modules.length}
                durationHours={course.durationHours}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
