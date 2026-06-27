"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext as RootThemeContext } from "../../components/ThemeProviders";
import Footer from "../../components/Footer";

// Create local context to share isDarkMode with subpages so they don't break
export const ThemeContext = createContext<boolean>(true);

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkMode = useContext(RootThemeContext);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/docs/getting-started", title: "Getting Started" },
    { href: "/docs/repl-modes", title: "REPL Modes" },
    { href: "/docs/syntax-guide", title: "Syntax Guide" },
    { href: "/docs/system-commands", title: "System Commands" },
  ];

  return (
    <ThemeContext.Provider value={isDarkMode}>
      {/* Shared Container Layout */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 px-4 pb-12 md:px-8 md:pb-24 mt-8 md:mt-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Navigation Column (Sticky on scroll for both desktop and mobile) */}
          <nav 
            className={`md:col-span-3 md:sticky md:top-6 flex flex-col gap-3 sticky top-0 z-30 w-[calc(100%+2rem)] md:w-auto -mx-4 md:mx-0 px-4 md:px-0 border-b border-dashed md:border-b-0 border-zinc-500/20 py-3 md:py-0 transition-colors ${
              isDarkMode ? "bg-black" : "bg-[#d6d6d6]"
            }`}
          >
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-magenta">
                Navigation
              </span>
              <div className="flex flex-col gap-3.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs md:text-sm font-semibold hover:text-magenta transition-colors ${
                        isActive
                          ? "text-magenta font-bold underline underline-offset-4"
                          : isDarkMode
                          ? "text-zinc-400"
                          : "text-zinc-700"
                      }`}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Collapsible Menu Dropdown */}
            <div className="md:hidden flex flex-col w-full relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider select-none py-1.5 px-1 focus:outline-none w-fit cursor-pointer ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <span className="text-magenta font-black">{isMenuOpen ? "˅" : ">"}</span> Menu
              </button>
              
              {isMenuOpen && (
                <div
                  className={`flex flex-col gap-3.5 p-4 border mt-2 rounded-xl transition-all z-20 shadow-md ${
                    isDarkMode 
                      ? "border-zinc-800 bg-zinc-950 text-white" 
                      : "border-zinc-500 bg-white text-black"
                  }`}
                >
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-xs font-bold transition-all hover:text-magenta ${
                          isActive 
                            ? "text-magenta" 
                            : isDarkMode 
                            ? "text-zinc-400" 
                            : "text-zinc-700"
                        }`}
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Page Content Column */}
          <main className="md:col-span-9 flex flex-col gap-8 text-sm leading-relaxed max-w-none">
            {children}
          </main>
        </div>

        {/* Divider */}
        <div className={`h-px w-full transition-colors ${isDarkMode ? "bg-zinc-800" : "bg-zinc-400"}`} />

        {/* Shared Footer */}
        <Footer/>
      </div>
    </ThemeContext.Provider>
  );
}
