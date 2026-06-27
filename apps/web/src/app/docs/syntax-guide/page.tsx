"use client";

import { useContext } from "react";
import { ThemeContext } from "../layout";

export default function SyntaxGuide() {
  const isDarkMode = useContext(ThemeContext);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-bold tracking-wide border-b border-dashed border-zinc-500/20 pb-2">
        Syntax Guide
      </h1>
      <p className={isDarkMode ? "text-zinc-300" : "text-zinc-800"}>
        Construct quick HTTP requests using our intuitive parameters mapping. Parameters are tokenized using spaces.
      </p>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">1. HTTP Method & URL Path</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Prepend the method keyword. If omitted, the request defaults to GET. Relative paths compile against the Base URL.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            GET /posts <br />
            /posts/1
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">2. Query Parameters (==)</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Map query queries using the double equals symbol.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            GET /posts limit==10 page==2
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">3. Custom Headers (:)</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Map headers using the colon separator. Quote values containing spaces.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            GET /users Authorization:"Bearer token123" Content-Type:application/json
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">4. JSON Body String Parameters (=)</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            For POST, PUT, or PATCH, assign key-value strings with the single equals symbol.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            POST /posts title="New post" category=tech
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">5. Raw Type JSON Values (:=)</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Map non-string types (booleans, numbers, arrays, nested objects) to JSON using the colon-equals symbol.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            POST /posts published:=true views:=150 tags:='["news", "web"]'
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-magenta">6. Nested JSON Objects (user[name])</span>
          <p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-700"}`}>
            Build nested fields using standard bracket notation.
          </p>
          <div className={`p-3 rounded-lg border font-mono text-xs overflow-x-auto select-all ${isDarkMode ? "border-zinc-800 bg-zinc-955 text-white" : "border-zinc-400 bg-white text-black"}`}>
            POST /users user[name]="John" user[address][city]="Seattle"
          </div>
        </div>
      </div>
    </section>
  );
}
