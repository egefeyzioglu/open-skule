import { notFound } from "next/navigation";

import NavBar from "src/app/_components/navbar";
import { getSampleCourseBySlug } from "src/lib/sample-courses";

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getSampleCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] px-8 py-12 text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-[0.2em] text-white/70 uppercase">
              Sample Course
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">
              {course.code}: {course.title}
            </h1>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-white/60">Instructor</p>
              <p className="mt-1 text-lg">{course.instructorName}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Semester</p>
              <p className="mt-1 text-lg">{course.semester}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/80">
              This is a stub course page backed by sample data. It exists to
              validate the end-to-end search flow before the real database and
              search backend are added.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
