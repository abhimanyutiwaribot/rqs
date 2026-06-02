import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { executeRequest } from "../core/executeRequest.js";

interface RequestScreenProps {
  onBack: () => void;
}

type RequestTab = "builder" | "params" | "headers" | "body";
type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"
type EditorMode = "none" | "url" | "body";

const tabs: RequestTab[] = ["builder", "params", "headers", "body"];
const methods: Methods[] = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];

export default function RequestScreen({ onBack }: RequestScreenProps) {
  const [activeTab, setActiveTab] = useState<RequestTab>("builder");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/");
  const [params, setParams] = useState<string[]>([]);
  const [body, setBody] = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode>("none");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<
    | { status: number; headers: Record<string, string>; body: string; time: number }
    | { error: string; time: number }
    | null
  >(null);

  const cycleMethod = () => {
    const currentIndex = methods.indexOf(method as Methods);
    setMethod(methods[(currentIndex + 1) % methods.length] as Methods);
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (body.trim() && !["GET", "HEAD"].includes(method)) {
      headers["Content-Type"] = "application/json";
    }

    const result = await executeRequest({
      method,
      url,
      headers,
      body,
    });

    setResponse(result);
    setLoading(false);
  };

  useInput((input, key) => {
    if (editorMode !== "none") {
      if (key.return) {
        setEditorMode("none");
        return;
      }

      if (key.backspace || key.delete) {
        if (editorMode === "url") {
          setUrl((current) => current.slice(0, -1));
        } else {
          setBody((current) => current.slice(0, -1));
        }
        return;
      }

      if (input) {
        if (editorMode === "url") {
          setUrl((current) => current + input);
        } else {
          setBody((current) => current + input);
        }
      }

      return;
    }

    if (input === "q" || input === "Q") {
      onBack();
      return;
    }

    if (key.tab && !key.shift) {
      const currentIndex = tabs.indexOf(activeTab);
      const nextTab =
        (tabs[(currentIndex + 1) % tabs.length] as RequestTab) || tabs[0]!;
      setActiveTab(nextTab);
    }

    if (key.tab && key.shift) {
      const currentIndex = tabs.indexOf(activeTab);
      const prevTab =
        (tabs[(currentIndex - 1 + tabs.length) % tabs.length] as RequestTab) ||
        tabs[0]!;
      setActiveTab(prevTab);
    }

    if (input === "1") setActiveTab("builder");
    if (input === "2") setActiveTab("params");
    if (input === "3") setActiveTab("headers");
    if (input === "4") setActiveTab("body");

    if (activeTab === "builder") {
      if (input === "u" || input === "U") {
        setEditorMode("url");
      }
      if (input === "b" || input === "B") {
        setEditorMode("body");
      }
      if (input === "m" || input === "M") {
        cycleMethod();
      }
      if (input === "e" || input === "E") {
        void sendRequest();
      }
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Text bold>HTTP Request Builder</Text>
      </Box>

      <Box marginBottom={1} gap={3}>
        {tabs.map((tab) => (
          <Text key={tab} bold={activeTab === tab}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        ))}
      </Box>

      <Box marginBottom={2}>
        <Text>{"\u2500".repeat(80)}</Text>
      </Box>

      {editorMode !== "none" && (
        <Box marginBottom={1}>
          <Text color="gray">
            {editorMode === "url" ? "Editing URL" : "Editing Body"} — Enter to finish, Backspace to remove.
          </Text>
        </Box>
      )}

      {activeTab === "builder" && (
        <Box flexDirection="column" marginBottom={2}>
          <Box marginBottom={1}>
            <Box width={15}>
              <Text>Method:</Text>
            </Box>
            <Text bold>{method}</Text>
          </Box>

          <Box marginBottom={1}>
            <Box width={15}>
              <Text>URL:</Text>
            </Box>
            <Text>{url}</Text>
          </Box>

          <Box marginTop={1} gap={3}>
            <Text color="gray">U - Edit URL</Text>
            <Text color="gray">M - Cycle Method</Text>
            <Text color="gray">B - Edit Body</Text>
            <Text color="gray">E - Execute</Text>
          </Box>
        </Box>
      )}

      {activeTab === "params" && (
        <Box flexDirection="column" marginBottom={2}>
          <Box marginBottom={1}>
            <Text>Query Parameters:</Text>
          </Box>
          {params.length === 0 ? (
            <Text dimColor>No parameters added</Text>
          ) : (
            params.map((p, i) => <Text key={i}>{p}</Text>)
          )}
        </Box>
      )}

      {activeTab === "headers" && (
        <Box flexDirection="column" marginBottom={2}>
          <Box marginBottom={1}>
            <Text>Request Headers:</Text>
          </Box>
          <Box marginBottom={1}>
            <Box width={25}>
              <Text>Accept</Text>
            </Box>
            <Text>application/json</Text>
          </Box>
          <Box>
            <Box width={25}>
              <Text>Content-Type</Text>
            </Box>
            <Text>{body.trim() ? "application/json" : "(none)"}</Text>
          </Box>
        </Box>
      )}

      {activeTab === "body" && (
        <Box flexDirection="column" marginBottom={2}>
          <Box marginBottom={1}>
            <Text>Request Body:</Text>
          </Box>
          <Box paddingX={1} borderStyle="single" borderColor="white">
            <Text>{body || "No body"}</Text>
          </Box>
        </Box>
      )}

      {loading && (
        <Box marginBottom={1}>
          <Text color="gray">Sending request to {url}</Text>
        </Box>
      )}

      {response && (
        <Box flexDirection="column" marginBottom={2}>
          {"error" in response ? (
            <Text color="red">Error: {response.error}</Text>
          ) : (
            <>
              <Box>
                <Text>Status:</Text>
                <Text bold> {response.status}</Text>
                <Text> ({response.time} ms)</Text>
              </Box>
              <Box>
                <Text>Headers:</Text>
                <Text bold> {Object.keys(response.headers).length}</Text>
              </Box>
              <Box marginTop={1} paddingX={1} borderStyle="single" borderColor="white">
                <Text>{response.body}</Text>
              </Box>
            </>
          )}
        </Box>
      )}

      <Box gap={3}>
        <Text color="gray">Tab - Next</Text>
        <Text color="gray">Shift+Tab - Prev</Text>
        <Text color="gray">Q - Back</Text>
      </Box>
    </Box>
  );
}
