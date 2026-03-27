"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { Input } from "src/components/ui/input";
import { sampleCourses } from "src/lib/sample-courses";
import { cn } from "src/lib/utils";

type NavbarSearchProps = {
  className?: string;
};

export default function NavbarSearch({ className }: NavbarSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const resultsId = useId();

  const trimmedQuery = query.trim();
  const filteredCourses = useMemo(() => {
    if (!trimmedQuery) {
      return [];
    }

    const normalizedQuery = trimmedQuery.toLowerCase();

    return sampleCourses.filter((course) =>
      [course.code, course.title, course.instructorName].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [trimmedQuery]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={query}
        placeholder="Search courses"
        className="pl-9"
        aria-label="Search courses"
        aria-expanded={isOpen}
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
      {isOpen ? (
        <div
          id={resultsId}
          className="bg-popover text-popover-foreground border-border absolute top-[calc(100%+0.5rem)] left-0 z-50 w-full overflow-hidden rounded-lg border shadow-lg"
        >
          {filteredCourses.length > 0 ? (
            <div className="py-1">
              {filteredCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="hover:bg-muted focus:bg-muted block px-4 py-3 transition-colors outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="grid gap-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{course.code}</p>
                      <p className="text-muted-foreground shrink-0 text-xs">
                        {course.semester}
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
          )}
        </div>
      ) : null}
    </div>
  );
}
