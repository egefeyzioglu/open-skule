"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import NavbarSearch from "src/app/_components/navbar-search";
import ThemeToggle from "src/app/_components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button, buttonVariants } from "src/components/ui/button";
import { cn } from "src/lib/utils";

type MobileNavMenuProps = {
  hideSearch?: boolean;
  userName?: string | null;
  userImage?: string | null;
};

function getInitials(name?: string | null) {
  if (!name) {
    return "OS";
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "OS";
}

export default function MobileNavMenu({
  hideSearch = false,
  userName,
  userImage,
}: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="tablet:hidden border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 border-b backdrop-blur"
    >
      <div className="grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-3 px-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="cursor-pointer"
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>

        <Link href="/" className="flex min-w-0 items-center justify-center gap-2">
          <>
            <Image
              src="/img/skule-logo-blue.png"
              width={120}
              height={48}
              alt="SKULE logo"
              className="block h-10 w-auto dark:hidden"
            />
            <Image
              src="/img/skule-logo-black.png"
              width={120}
              height={48}
              alt="SKULE logo"
              className="hidden h-10 w-auto invert dark:block"
            />
          </>
          <p className="text-foreground truncate text-lg font-semibold tracking-tight">
            OpenCourseWare
          </p>
        </Link>

        <div className="size-10" aria-hidden="true" />
      </div>

      {isOpen ? (
        <div className="border-border border-t px-4 py-4">
          <div className="flex flex-col gap-3">
            {!hideSearch ? <NavbarSearch className="w-full" /> : null}

            {userName ? (
              <Link
                href="/api/auth/signout"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 justify-start gap-3 px-3",
                )}
              >
                <Avatar size="sm">
                  <AvatarImage
                    src={userImage ?? undefined}
                    alt={userName ?? "User profile"}
                  />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{userName}</span>
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 justify-start px-3",
                )}
              >
                Log in
              </Link>
            )}

            <div className="px-3">
              <ThemeToggle
                mode="text"
                className="h-11 w-max justify-start px-0 cursor-pointer hover:bg-transparent hover:text-current dark:hover:bg-transparent"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
