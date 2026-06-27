"use client";

import { useContext } from "react";
import { ThemeContext } from "../layout";

export default function ReplModes() {
  const isDarkMode = useContext(ThemeContext);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-bold tracking-wide border-b border-dashed border-zinc-500/20 pb-2">
        REPL Modes
      </h1>
      <p className={isDarkMode ? "text-zinc-300" : "text-zinc-800"}>
        The interactive terminal uses two modes for high speed request configuration and output review.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-500 bg-zinc-200/20"
          }`}
        >
          <span className="font-bold text-magenta text-xs uppercase tracking-wider">
            Input Mode (Default)
          </span>
          <p className={`mt-2 text-xs leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Allows typing commands, URLs, and bodies directly at the prompt. Supports automatic tab-completion.
          </p>
        </div>
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode ? "border-zinc-800 bg-zinc-900/20" : "border-zinc-500 bg-zinc-200/20"
          }`}
        >
          <span className="font-bold text-magenta text-xs uppercase tracking-wider">
            Scroll Mode (Escape)
          </span>
          <p className={`mt-2 text-xs leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Disconnects console typing to let you scroll history, open the response details inspector, and copy response payloads.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Key Bindings Reference
        </span>
        <div
          className={`border overflow-hidden rounded-xl ${
            isDarkMode ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-500 bg-white text-black"
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b ${isDarkMode ? "border-zinc-800" : "border-zinc-500"}`}>
                <th className="p-3 font-bold text-zinc-500 uppercase tracking-wider w-[120px]">Key</th>
                <th className="p-3 font-bold text-zinc-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${isDarkMode ? "border-zinc-850" : "border-zinc-300"}`}>
                <td className="p-3 font-semibold font-mono">Escape</td>
                <td className="p-3">Switch from Input Mode to Scroll Mode</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? "border-zinc-850" : "border-zinc-300"}`}>
                <td className="p-3 font-semibold font-mono">i / Escape</td>
                <td className="p-3">Return to Input Mode (from Scroll Mode)</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? "border-zinc-850" : "border-zinc-300"}`}>
                <td className="p-3 font-semibold font-mono">j / k (Arrow keys)</td>
                <td className="p-3">Scroll output logs (Scroll Mode only)</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? "border-zinc-850" : "border-zinc-300"}`}>
                <td className="p-3 font-semibold font-mono">v</td>
                <td className="p-3">Open Response Inspector panel (Body vs Headers tabs)</td>
              </tr>
              <tr className={`border-b ${isDarkMode ? "border-zinc-850" : "border-zinc-300"}`}>
                <td className="p-3 font-semibold font-mono">c</td>
                <td className="p-3">Copy active tab content to clipboard (Response Inspector mode)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-mono">q</td>
                <td className="p-3">Exit the client shell</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
