"use client";

import { useContext } from "react";
import { ThemeContext } from "../layout";

export default function GettingStarted() {
  const isDarkMode = useContext(ThemeContext);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-bold tracking-wide border-b border-dashed border-zinc-500/20 pb-2">
        Getting Started
      </h1>
      <p className={isDarkMode ? "text-zinc-300" : "text-zinc-800"}>
        Install postcli globally to access the interactive HTTP terminal client shell directly from any console.
      </p>
      
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Installation
        </span>
        <div
          className={`p-4 rounded-xl border relative font-mono text-xs overflow-x-auto select-all ${
            isDarkMode ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-500 bg-white text-black"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div><span className="text-zinc-500"># npm</span> <br />npm install -g postcli</div>
            <div><span className="text-zinc-500"># bun</span> <br />bun add -g postcli</div>
            <div><span className="text-zinc-500"># yarn</span> <br />yarn global add postcli</div>
            <div><span className="text-zinc-500"># pnpm</span> <br />pnpm add -g postcli</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Launching the REPL
        </span>
        <p className={isDarkMode ? "text-zinc-300" : "text-zinc-850"}>
          Once installed, run the cli name to launch the client prompt:
        </p>
        <div
          className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto select-all ${
            isDarkMode ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-500 bg-white text-black"
          }`}
        >
          postcli
        </div>
      </div>
    </section>
  );
}
