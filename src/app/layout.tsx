import "src/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "src/trpc/react";

export const metadata: Metadata = {
  title: "Skule™ OpenCourseWare",
  // description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const themeInitScript = `
  (() => {
    const storageKey = "open-skule-theme";
    const root = document.documentElement;

    root.classList.add("theme-booting");

    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      const theme = storedTheme ?? "dark";
      const isDark = theme === "dark";

      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    } catch {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }

    requestAnimationFrame(() => {
      root.classList.remove("theme-booting");
    });
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <footer className="text-muted-foreground px-6 py-6 text-center text-sm sm:px-10 lg:px-12">
              By{" "}
              <a
                href="https://skule.ca"
                target="_blank"
                rel="noreferrer noopener"
                className="text-foreground underline underline-offset-4"
              >
                EngSoc
              </a>
              , for students
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
