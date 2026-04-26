"use client";

import { usePathname } from "next/navigation";
import CourseSearch from "src/app/_components/course-search";

type NavbarSearchProps = {
  className?: string;
};

export default function NavbarSearch({ className }: NavbarSearchProps) {
  const pathname = usePathname();
  // Do not render navbar on the home page
  if(pathname === "/"){ return <></>; }
  return <CourseSearch className={className} variant="compact" />;
}
