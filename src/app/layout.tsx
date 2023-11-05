import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/providers";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search-dialog";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Real Fans",
  description:
    "Real Fans is a social media platform for fans to share their love for their favorite artists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("font-sans antialiased bg-background", inter.variable)}
      >
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex lg:">
              <div className="fixed justify-between left-0 top-0 flex w-full gap-x-4 items-center px-6 border-b lg:border-b-0 border-gray-300 max-lg:bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit lg:static lg:w-auto lg:rounded-xl">
                <Link href="/">
                  <Image
                    src="/logo_real_fans_no_background.png"
                    alt="Next.js Logo"
                    width={100}
                    height={20}
                  />
                </Link>
                <SearchDialog />
              </div>
              <div className="fixed flex items-center bottom-0 left-0 h-24 w-full justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none flex-wrap gap-x-5">
                <div className="flex gap-x-4 items-center tracking-wider justify-center">
                  <Link href="/leaderboard">Leaderboard</Link>
                  <Link href="/profile">Profile</Link>
                  <Link href="/inbox">Inbox</Link>
                </div>
                <w3m-button />
              </div>
            </div>

            {children}

            {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Docs{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Find in-depth information about Next.js features and API.
                </p>
              </a>

              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Learn{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Learn about Next.js in an interactive course
                  with&nbsp;quizzes!
                </p>
              </a>

              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Templates{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Explore the Next.js 13 playground.
                </p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Deploy{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Instantly deploy your Next.js site to a shareable URL with
                  Vercel.
                </p>
              </a>
            </div> */}
            <div />
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
