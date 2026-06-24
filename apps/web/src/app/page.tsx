"use client";

import { useState, useEffect } from "react";

// Mascot Frames matching CLI client exactly
const VICTORY_FRAMES = [
  [
    "  ╭─────────────╮",
    "  │ Request OK! │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│◉ ‿ ◉  │",
    "        ╰──┬──┬─╯",
    "          ┌┴──┴┐",
    "         /│ ▓▓ │\\",
    "         └┴────┴┘"
  ],
  [
    "  ╭─────────────╮",
    "  │   WOOHOO!   │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│◉ ‿ ◉  │",
    "        ╰──┬──┬─╯",
    "         \\┌┴──┴┐/",
    "          │ ▓▓ │",
    "         ┌┴────┴┐"
  ],
  [
    "  ╭─────────────╮",
    "  │  Great Job! │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│◉ ─ ◉  │",
    "        ╰──┬──┬─╯",
    "          ┌┴──┴┐",
    "         \\│ ▓▓ │",
    "         └┴────┴┘"
  ]
];

const FAILURE_FRAMES = [
  [
    "  ╭─────────────╮",
    "  │  Error! :(  │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│* ﹏ * │",
    "        ╰──┬──┬─╯",
    "          ┌┴──┴┐",
    "         /│ ░░ │\\",
    "         └┴────┴┘"
  ],
  [
    "  ╭─────────────╮",
    "  │ BZZT! CRASH │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│* ﹏ * │",
    "        ╰──┬──┬─╯",
    "          ┌┴──┴┐",
    "          │ ░░ │",
    "         ┌┴────┴┐"
  ],
  [
    "  ╭─────────────╮",
    "  │  Glitch...  │",
    "  ╰───┬─────────╯",
    "      │ ╭───────╮",
    "      └─│* ﹏ * │",
    "        ╰──┬──┬─╯",
    "          ┌┴──┴┐",
    "         /│ ░░ │\\",
    "         └┴────┴┘"
  ]
];

const SIMULATOR_EXAMPLES = [
  {
    title: "1. Query Parameters",
    cmd: "GET jsonplaceholder.typicode.com/posts limit==3",
    desc: "Uses HTTPie double-equals (==) to append query search parameters.",
    method: "GET",
    status: "200 OK",
    time: "192ms",
    size: "1.1 KB",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "max-age=43200",
      "server": "cloudflare"
    },
    body: `[
  { "id": 1, "title": "delectus aut autem", "completed": false },
  { "id": 2, "title": "quis ut nam facilis", "completed": false },
  { "id": 3, "title": "fugiat veniam minus", "completed": true }
]`
  },
  {
    title: "2. Nested JSON Body",
    cmd: "POST /signup user[name]=\"John\" user[age]:=30 tags[]=\"tech\" tags[]=\"news\"",
    desc: "Constructs a nested JSON payload using brackets with string (=) and JSON literals (:=).",
    method: "POST",
    status: "201 Created",
    time: "320ms",
    size: "640 B",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "location": "/signup/72",
      "server": "nginx"
    },
    body: `{
  "user": {
    "name": "John",
    "age": 30
  },
  "tags": [
    "tech",
    "news"
  ]
}`
  },
  {
    title: "3. Request Headers",
    cmd: "GET /posts Authorization:\"Bearer eyJhbGci...\" Accept:application/json",
    desc: "Assigns HTTP headers using the colon (:) operator. Quotes are preserved for values with spaces.",
    method: "GET",
    status: "200 OK",
    time: "154ms",
    size: "720 B",
    headers: {
      "content-type": "application/json",
      "x-ratelimit-limit": "1000",
      "x-ratelimit-remaining": "998"
    },
    body: `{
  "authenticated": true,
  "scope": "posts:read",
  "client": "PostCLI/v1.0.0"
}`
  },
  {
    title: "4. Error Reaction",
    cmd: "GET /posts/99999",
    desc: "Simulates a failed HTTP request status code (>= 400), showing the glitch ASCII mascot in action.",
    method: "GET",
    status: "404 Not Found",
    time: "115ms",
    size: "245 B",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "server": "cloudflare"
    },
    body: `{
  "error": "Post with ID 99999 not found",
  "code": "RESOURCE_MISSING"
}`
  }
];

export default function Home() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<"body" | "headers">("body");
  const [mascotFrame, setMascotFrame] = useState(0);
  const [copiedText, setCopiedText] = useState(false);

  const activeExample = SIMULATOR_EXAMPLES[selectedExample]!;

  // Trigger typing simulation when example changes
  useEffect(() => {
    setIsTyping(true);
    setTypedCommand("");
    setTypingIndex(0);
    setShowInspector(false);
  }, [selectedExample]);

  useEffect(() => {
    if (!isTyping) return;
    const target = activeExample.cmd;
    if (typingIndex < target.length) {
      const timeout = setTimeout(() => {
        setTypedCommand((prev) => prev + target[typingIndex]);
        setTypingIndex((idx) => idx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setIsLoading(true);
      const loadTimeout = setTimeout(() => {
        setIsLoading(false);
        setShowInspector(true);
        setInspectorTab("body");
      }, 600);
      return () => clearTimeout(loadTimeout);
    }
  }, [isTyping, typingIndex, selectedExample, activeExample]);

  // Mascot animation loops
  useEffect(() => {
    const interval = setInterval(() => {
      setMascotFrame((f) => (f + 1) % 3);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm run build && npm run dev:cli");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const isFailed = activeExample.status.includes("404") || activeExample.status.includes("Error");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-magenta selection:text-white font-sans overflow-x-hidden antialiased">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-magenta font-black text-xl tracking-wider">❯ PostCLI</span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-magenta/10 text-magenta rounded border border-magenta/20">v1.0.0</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#syntax" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Syntax Guide</a>
            <a href="#features" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">CLI Features</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-semibold rounded-full border border-zinc-800 hover:bg-zinc-900 transition-all flex items-center gap-1.5"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-magenta/25 bg-magenta/5 text-magenta text-xs font-mono font-semibold mb-6 animate-pulse">
          ✨ Premium Interactive HTTP Client for Terminals
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent max-w-4xl mx-auto leading-tight">
          An Interactive HTTP Console built for Developers
        </h1>
        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Forget typing messy CURL arguments. Write neat, HTTPie-compliant queries directly inside an anchored terminal REPL console with responsive mascot companions.
        </p>

        {/* Copy command box */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div 
            onClick={handleCopyInstall}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all cursor-pointer font-mono text-sm max-w-md w-full justify-between"
          >
            <span className="text-zinc-400 select-none">❯ <span className="text-zinc-100">npm run build && npm run dev:cli</span></span>
            <span className="text-xs text-magenta/80 font-semibold">{copiedText ? "Copied!" : "Copy"}</span>
          </div>
          <a
            href="#simulator"
            className="px-6 py-3 rounded-xl bg-magenta hover:bg-magenta/90 text-white font-semibold shadow-lg shadow-magenta/20 transition-all text-sm w-full sm:w-auto"
          >
            Try Live Simulator
          </a>
        </div>
      </section>

      {/* Live Command Simulator */}
      <section id="simulator" className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-bold text-magenta tracking-widest text-center uppercase mb-3">Interactive CLI Simulator</h2>
        <h3 className="text-3xl font-extrabold text-center text-zinc-100 mb-12">See how PostCLI handles inputs</h3>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Example Selector Controls */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SIMULATOR_EXAMPLES.map((ex, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  selectedExample === index
                    ? "border-magenta bg-magenta/5 shadow-md shadow-magenta/5"
                    : "border-zinc-900 bg-zinc-900/20 hover:border-zinc-800 hover:bg-zinc-900/40"
                }`}
              >
                <span className={`text-xs font-bold ${selectedExample === index ? "text-magenta" : "text-zinc-500"}`}>
                  {ex.title}
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-200 truncate">{ex.cmd}</span>
                <span className="text-xs text-zinc-400 leading-normal">{ex.desc}</span>
              </button>
            ))}
          </div>

          {/* Simulator Terminal Screen */}
          <div className="lg:col-span-8 rounded-2xl border border-zinc-850 bg-black shadow-2xl overflow-hidden font-mono text-sm leading-relaxed flex flex-col h-[520px] justify-between">
            {/* Terminal Header */}
            <div className="px-5 py-3 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-850" />
                <div className="w-3 h-3 rounded-full bg-zinc-900" />
              </div>
              <span className="text-xs text-zinc-500 font-semibold font-mono">PostCLI REPL Session</span>
              <div className="w-12" />
            </div>

            {/* Terminal Logs & Views */}
            <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="flex flex-col gap-2">
                {/* Brand Logo Print */}
                <div className="text-[10px] text-magenta leading-none font-bold select-none opacity-60">
                  ██████╗  ██████╗ ███████╗████████╗ ██████╗██╗     ██╗<br/>
                  ██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██║     ██║<br/>
                  ██████╔╝██║   ██║███████╗   ██║   ██║     ██║     ██║<br/>
                  ██╔═══╝ ██║   ██║╚════██║   ██║   ██║     ██║     ██║<br/>
                  ██║     ╚██████╔╝███████║   ██║   ╚██████╗███████╗██║<br/>
                  ╚═╝      ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝╚══════╝╚═╝
                </div>
                <div className="text-zinc-500 text-xs mt-2">Type a request or type /help for guides. Esc to toggle Scroll mode.</div>
                
                {/* Command Line Prompt */}
                <div className="flex gap-2 items-center mt-4">
                  <span className="text-magenta font-bold">postcli ❯</span>
                  <span className="text-zinc-100 flex-1">{typedCommand}</span>
                </div>

                {/* HTTP Request Status Indicator */}
                {isLoading && (
                  <div className="text-yellow-500 flex gap-2 items-center mt-2">
                    <span className="animate-spin font-sans font-normal text-base">⠋</span>
                    <span>Sending {activeExample.method} request...</span>
                  </div>
                )}

                {/* Simulated Console Completion Feedback */}
                {!isLoading && showInspector && (
                  <div className="text-green-500 mt-2">
                    {isFailed ? (
                      <span className="text-red-500">✖ {activeExample.status}  •  {activeExample.time}  •  {activeExample.size} (Mascot reacted)</span>
                    ) : (
                      <span>✔ {activeExample.status}  •  {activeExample.time}  •  {activeExample.size}  •  (Response Details loaded below)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Response Details Overlay inside Terminal */}
              {!isLoading && showInspector && (
                <div className="mt-6 border border-zinc-800 rounded-xl bg-zinc-950 p-4 flex flex-col gap-3 flex-1 h-[260px]">
                  {/* Header metadata bar */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <div className="flex gap-2 items-center text-xs">
                      <span className="text-magenta font-bold">❯ Response Details</span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-zinc-400">
                        Status: <span className={isFailed ? "text-red-500" : "text-green-500"}>{activeExample.status}</span>
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <button 
                        onClick={() => setInspectorTab("body")}
                        className={`font-bold transition-all ${inspectorTab === "body" ? "text-magenta" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        ● Body
                      </button>
                      <button 
                        onClick={() => setInspectorTab("headers")}
                        className={`font-bold transition-all ${inspectorTab === "headers" ? "text-magenta" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        ● Headers
                      </button>
                    </div>
                  </div>

                  {/* Body Columns: Payload (Left) + Mascot Frame (Right) */}
                  <div className="flex flex-row justify-between flex-1 overflow-hidden">
                    {/* Viewport content */}
                    <pre className="flex-1 overflow-y-auto text-xs pr-4 text-zinc-300 custom-scrollbar whitespace-pre-wrap">
                      {inspectorTab === "body" 
                        ? activeExample.body
                        : Object.entries(activeExample.headers).map(([k, v]) => `${k}: ${v}`).join("\n")
                      }
                    </pre>

                    {/* Mascot sidebar */}
                    <div className="w-[170px] border-l border-zinc-900 pl-4 flex flex-col justify-center shrink-0">
                      {isFailed ? (
                        <div className="text-red-500 text-[10px] leading-none whitespace-pre select-none">
                          {FAILURE_FRAMES[mascotFrame]!.map((line, idx) => (
                            <div key={idx}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-magenta text-[10px] leading-none whitespace-pre select-none">
                          {VICTORY_FRAMES[mascotFrame]!.map((line, idx) => (
                            <div key={idx}>{line}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inspector Footer Navigation helpers */}
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-2 border-t border-zinc-900">
                    <span>Press Tab to toggle tabs • j/k to scroll • Esc to exit details</span>
                    <span>PostCLI Interactive Mascot</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HTTPie Command Syntax Documentation */}
      <section id="syntax" className="py-20 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs font-bold text-magenta tracking-widest text-center uppercase mb-3">Syntax & Rules</h2>
          <h3 className="text-3xl font-extrabold text-center text-zinc-100 mb-16">Standardized HTTPie Parsing</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Implicit GET */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs mb-4">G</div>
                <h4 className="text-lg font-bold text-zinc-100">Implicit HTTP Method</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Omit the request verb entirely. If no standard method is supplied, PostCLI automatically treats the URL request as a `GET`.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">/posts/1</span>
              </div>
            </div>

            {/* Explicit Query Params */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-mono font-bold text-xs mb-4">Q</div>
                <h4 className="text-lg font-bold text-zinc-100">Query Parameters</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Use double-equals `==` to assign search variables. They are automatically appended into the request URL query string.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">/posts limit==3 page==1</span>
              </div>
            </div>

            {/* Custom Request Headers */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs mb-4">H</div>
                <h4 className="text-lg font-bold text-zinc-100">HTTP Request Headers</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Set client headers using the colon `:` operator. Ensure custom values with whitespace are wrapped in quote strings.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">/posts Authorization:"Bearer token"</span>
              </div>
            </div>

            {/* Flat JSON Payload */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-xs mb-4">F</div>
                <h4 className="text-lg font-bold text-zinc-100">JSON Fields (`=` & `:=`)</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  For write requests, single equals `=` defines a JSON string field. Use `:=` for integers, booleans, arrays, or objects.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">POST /posts title="hello" active:=true</span>
              </div>
            </div>

            {/* Bracket Nesting */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-mono font-bold text-xs mb-4">N</div>
                <h4 className="text-lg font-bold text-zinc-100">Bracket Nested JSON</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Build complex structures dynamically using `key[sub]=val`. Empty brackets `tags[]` automatically append list items.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">POST /signup user[name]="John" tags[]="tech"</span>
              </div>
            </div>

            {/* Base URL Context */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-magenta/10 text-magenta flex items-center justify-center font-mono font-bold text-xs mb-4">B</div>
                <h4 className="text-lg font-bold text-zinc-100">Persistent Base URL</h4>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Set a persistent host context using `${'/set base <url>'}`. Relative routes starting with a slash (`/`) resolve to this path.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-black border border-zinc-900 font-mono text-xs text-zinc-300">
                postcli ❯ <span className="text-white">/set base api.github.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-bold text-magenta tracking-widest text-center uppercase mb-3">CLI Console Advantages</h2>
        <h3 className="text-3xl font-extrabold text-center text-zinc-100 mb-16">Terminal Client UX Highlights</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border border-zinc-905 bg-gradient-to-br from-zinc-900/40 to-zinc-950/20">
            <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-magenta" /> Clean Terminal Screen Buffer
            </h4>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              PostCLI runs within your terminal's alternate screen buffer (`\x1b[?1049h`). Every time you launch and close the REPL app, your shell's layout, history, and scrollback coordinates are cleanly preserved without pollution.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-905 bg-gradient-to-br from-zinc-900/40 to-zinc-950/20">
            <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-magenta" /> Tab-Contextual Copy
            </h4>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Copying response content to your local clipboard is simple and intuitive. Pressing the `c` key automatically copy-detects your active tab context: copying the formatted JSON body when on "Body", and formatted headers when on "Headers".
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-905 bg-gradient-to-br from-zinc-900/40 to-zinc-950/20">
            <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-magenta" /> Live Autocomplete & History
            </h4>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              PostCLI shows light gray command and method autocomplete suggestions dynamically as you type. Use standard `Tab` to accept suggestions, and standard `Up` / `Down` arrow keys to load past REPL request histories.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-905 bg-gradient-to-br from-zinc-900/40 to-zinc-950/20">
            <h4 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-magenta" /> Anchored Bottom Prompt
            </h4>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              The output console log box enforces a stable height to keep the input prompt firmly anchored at the bottom of the screen. This gives the console shell stability and prevents elements from jumping around upon every execution.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-zinc-500 font-mono">
            &copy; {new Date().getFullYear()} PostCLI. Built for developer productivity.
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#simulator" className="hover:text-zinc-300">Simulator</a>
            <a href="#syntax" className="hover:text-zinc-300">Syntax Reference</a>
            <a href="https://github.com" className="hover:text-zinc-300">Repository</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
