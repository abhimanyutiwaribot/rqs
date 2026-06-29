import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center px-4 py-16 text-center font-mono">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-black text-magenta">
          404
        </h1>
        <p className="text-sm md:text-base text-zinc-650 dark:text-zinc-300 max-w-sm">
          page not found. the link might be broken or the path has moved.
        </p>
        <Link
          href="/"
          className="text-xs md:text-sm text-magenta hover:underline mt-2 inline-flex items-center gap-1.5"
        >
          <span>❯ return home</span>
        </Link>
      </div>
    </div>
  );
}
