"use client";

import { useContext } from "react";
import { ThemeContext } from "../layout";

export default function SystemCommands() {
  const isDarkMode = useContext(ThemeContext);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-bold tracking-wide border-b border-dashed border-zinc-500/20 pb-2">
        System Commands
      </h1>
      <p className={isDarkMode ? "text-zinc-300" : "text-zinc-800"}>
        Manage the REPL terminal state using slash commands.
      </p>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs text-magenta">/set base &lt;url&gt;</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Sets the root base URL for relative endpoints. Normalizes to http/https automatically.
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs text-magenta">/clear</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Clears the active REPL logs history.
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs text-magenta">/copy</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Copies the last received response JSON body to the system clipboard.
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs text-magenta">/help</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Outputs a cheat-sheet command guide directly inside the terminal console.
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs text-magenta">/exit /quit</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Shuts down the terminal client session.
          </p>
        </div>
      </div>
    </section>
  );
}
