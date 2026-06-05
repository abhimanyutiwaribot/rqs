import { VIEWPORT_HEIGHT } from "../constants/constants.js";
import { prettyBody } from "../utils/response.js";
import type { useResponseState } from "./useResponseState.js";
import type { useUiState } from "./useUiState.js";

interface ResponseActionProps {
  responseState: ReturnType<typeof useResponseState>
  uiState: ReturnType<typeof useUiState>
}

export function useResponseAction({responseState, uiState}: ResponseActionProps) {

  const responseLines: string[] = (() => {
    if (!responseState.response || "error" in responseState.response) return [];
    if (uiState.rightTab === "body") return prettyBody(responseState.response.body).split("\n");
    return Object.entries(responseState.response.headers).map(([k, v]) => `${k}: ${v}`);
  })();

  const totalLines = responseLines.length;
  const visibleLines = responseLines.slice(responseState.respScroll, responseState.respScroll + VIEWPORT_HEIGHT);
  // Pad to fixed height so layout doesn't shift
  const paddedLines = [
    ...visibleLines,
    ...Array(Math.max(0, VIEWPORT_HEIGHT - visibleLines.length)).fill(""),
  ];

  return {
    totalLines,
    visibleLines,
    paddedLines
  }
}