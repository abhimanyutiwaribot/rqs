"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  return (
    <header className="flex w-full max-w-[826px] items-center justify-between gap-3 rounded-full border px-4 py-3 transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-700 ease-out sm:gap-4 sm:px-5 sm:py-3.5 border-slate-200/70 dark:border-zinc-800/60 bg-white/45 dark:bg-black/70 text-slate-900 dark:text-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md backdrop-saturate-150">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="font-bold text-base md:text-lg">
            rqsh <span className="text-magenta font-black">❯</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          href="/docs/getting-started"
          className="text-xs md:text-sm hover:underline transition-colors text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
        >
          Docs
        </Link>
        <a
          href="https://github.com/abhimanyutiwaribot/rqsh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm hover:underline transition-colors text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
        >
          Github
        </a>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-1.5 rounded-lg transition-all hover:bg-zinc-300 text-black dark:hover:bg-zinc-900 dark:text-white"
        >
          {mounted && isDark ? (
            // Sun Icon for Light Mode Toggle
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            // Moon Icon for Dark Mode Toggle
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
