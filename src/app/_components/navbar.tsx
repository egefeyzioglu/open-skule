import Image from "next/image";
import Link from "next/link";

import AuthButton from "src/app/_components/auth-button";
import MobileNavMenu from "src/app/_components/mobile-nav-menu";
import NavbarSearch from "src/app/_components/navbar-search";
import ThemeToggle from "src/app/_components/theme-toggle";
import { auth } from "src/server/auth";

type NavBarProps = {
  hideSearch?: boolean;
};

export default async function NavBar({ hideSearch = false }: NavBarProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="max-tablet:hidden border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 border-b backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full items-center justify-between gap-2 px-8 sm:px-10 lg:px-12">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <Image
                src="https://picsum.photos/120/48"
                width={120}
                height={48}
                alt="SKULE logo placeholder"
                className="h-10 w-auto rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="text-foreground truncate text-lg font-semibold tracking-tight sm:text-xl">
                  OpenCourseWare
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {!hideSearch ? (
              <NavbarSearch className="hidden w-72 desktop:block" />
            ) : null}
            <ThemeToggle />
            {user ? (
              <AuthButton image={user.image} name={user.name} />
            ) : (
              <Link
                href="/api/auth/signin"
                className="border-input bg-background hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 inline-flex h-10 shrink-0 items-center justify-center rounded-lg border px-4 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
        {!hideSearch ? (
          <div className="desktop:hidden border-border border-t px-8 py-2">
            <NavbarSearch className="mx-auto w-full" />
          </div>
        ) : null}
      </header>

      <MobileNavMenu
        hideSearch={hideSearch}
        userName={user?.name}
        userImage={user?.image}
      />
    </>
  );
}
