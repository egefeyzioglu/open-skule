"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { sampleCourses } from "src/lib/sample-courses";
import { formatSemesterCode } from "src/lib/semester";
import { cn } from "src/lib/utils";

type CourseSearchProps = {
  className?: string;
  variant?: "compact" | "hero";
};

function filterCourses(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return sampleCourses.filter((course) =>
    [course.code, course.title, course.instructorName].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  ).slice(0, 4);
}

export default function CourseSearch({
  className,
  variant = "compact",
}: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const resultsId = useId();

  const trimmedQuery = query.trim();
  const filteredCourses = useMemo(() => filterCourses(trimmedQuery), [trimmedQuery]);
  const featuredCourses = useMemo(() => sampleCourses.slice(0, 4), []);
  const isHero = variant === "hero";
  const shouldShowPanel = isOpen;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function handleSelect(slug: string) {
    setIsOpen(false);
    router.push(`/courses/${slug}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" && filteredCourses.length > 0) {
      event.preventDefault();
      handleSelect(filteredCourses[0]!.slug);
    }
  }

  const panelContent =
    filteredCourses.length > 0 ? (
      <div className={cn("py-1", isHero && "grid gap-2 p-2")}>
        {filteredCourses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className={cn(
              "cursor-pointer hover:bg-muted focus:bg-muted block rounded-lg px-4 py-3 transition-colors outline-none",
              isHero && "border-border bg-background/70 border",
            )}
            onClick={() => setIsOpen(false)}
          >
            <div className="grid gap-1">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{course.code}</p>
                <p className="text-muted-foreground shrink-0 text-xs">
                  {formatSemesterCode(course.semester)}
                </p>
              </div>
              <p className="truncate text-sm">{course.title}</p>
              <p className="text-muted-foreground truncate text-xs">
                {course.instructorName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="px-4 py-3">
        <p className="text-sm font-medium">No matching courses found.</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Try a course code, title, or instructor name.
        </p>
      </div>
    );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <div className="relative">
          <Search
            className={cn(
              "text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2",
              isHero ? "size-5" : "size-4",
            )}
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            placeholder={isHero ? "Search by course code, title, or instructor" : "Search courses"}
            className={cn(isHero ? "h-14 rounded-xl pl-11 text-base md:text-lg" : "pl-9")}
            aria-label="Search courses"
            aria-expanded={shouldShowPanel}
            aria-controls={resultsId}
            onFocus={() => {
              if (trimmedQuery) {
                setIsOpen(true);
              }
            }}
            onChange={(event) => {
              const nextQuery = event.target.value;

              setQuery(nextQuery);
              setIsOpen(nextQuery.trim().length > 0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        {shouldShowPanel ? (
          <div
            id={resultsId}
            className={cn(
              "text-popover-foreground overflow-hidden",
              isHero
                ? "bg-popover border-border relative mt-3 w-full rounded-xl border shadow-lg"
                : "bg-popover border-border absolute top-[calc(100%+0.5rem)] left-0 z-50 w-full rounded-lg border shadow-lg",
            )}
          >
            {panelContent}
          </div>
        ) : null}
      </div>
      {isHero ? (
        <div className="mt-4 space-y-3 p-2">
          <p className="text-muted-foreground px-2 text-xs font-medium tracking-[0.18em] uppercase">
            Featured Courses
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {featuredCourses.map((course) => (
              <Button
                key={course.slug}
                variant="outline"
                size="lg"
                className="h-auto w-full items-start justify-start px-4 py-4 text-left cursor-pointer"
                onClick={() => handleSelect(course.slug)}
              >
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{course.code}</span>
                    <span className="text-muted-foreground text-xs">
                      {formatSemesterCode(course.semester)}
                    </span>
                  </div>
                  <p className="text-sm leading-snug">{course.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {course.instructorName}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
