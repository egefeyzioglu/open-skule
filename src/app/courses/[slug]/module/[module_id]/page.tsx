import { getSampleCourseBySlug } from "src/lib/sample-courses";
import { notFound } from "next/navigation";
import ModuleList from "src/app/_components/module-list";


type ModulePageProps = {
    params: Promise<{
        slug: string;
        module_id: string;
    }>;
}

// TODO: Optimistic updates for ModuleList
export default async function ModulePage({params} : ModulePageProps){
    const {slug, module_id} = await params;
    const course = getSampleCourseBySlug(slug);
    if(!course) notFound();
    const module = course.modules.find((val)=>val.id === module_id);
    if(!module) notFound();

    return (
      <div className="from-background via-background to-muted/50 min-h-screen bg-gradient-to-b flex flex-row">
        <div className="flex flex-row grow-1">
          <ModuleList course={course} currentModule={module.id}/>
        </div>
        <main className="grow-1">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          </div>
        </main>
      </div>
  );
}