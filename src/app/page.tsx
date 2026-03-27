import NavBar from "src/app/_components/navbar";
import CourseSearch from "src/app/_components/course-search";
import { HydrateClient } from "src/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="from-background via-background to-muted/50 min-h-screen bg-gradient-to-b">
        <NavBar hideSearch />
        <main>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
            <section className="pt-4 sm:pt-8">
              <div className="mx-auto max-w-3xl">
                <CourseSearch variant="hero" />
              </div>
            </section>

            <section className="mx-auto max-w-3xl space-y-4 px-1">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  What is SKULE&trade; OpenCourseWare?
                </h2>
              </div>
              <div className="text-muted-foreground space-y-4 text-base leading-7">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
