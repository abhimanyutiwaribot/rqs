"use client";

import React, { useState, useEffect, createContext } from "react";
import Header from "./Header";

export const ThemeContext = createContext<boolean>(true);

interface ThemeProvidersProps {
  children: React.ReactNode;
}

export default function ThemeProviders({ children }: ThemeProvidersProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage if set
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDarkMode(saved === "dark");
    }
  }, []);

  // Update classes and localStorage on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div
        className={`min-h-screen font-mono flex flex-col transition-colors duration-300 ${
          isDarkMode ? "bg-black text-white" : "bg-[#d6d6d6] text-black"
        }`}
      >
        {/* Global fixed top bar header */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-6 md:px-8 md:pt-12">
          <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
