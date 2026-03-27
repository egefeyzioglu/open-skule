"use client";

import CourseSearch from "src/app/_components/course-search";

type NavbarSearchProps = {
  className?: string;
};

export default function NavbarSearch({ className }: NavbarSearchProps) {
  return <CourseSearch className={className} variant="compact" />;
}
