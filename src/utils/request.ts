import clipboard from "clipboardy";
import { METHODS } from "../constants/constants.js";
import { executeRequest } from "../core/executeRequest.js";
import { useRequestState } from "../hooks/useRequestState.js";
import { useResponseState } from "../hooks/useResponseState.js";
import { useUiState } from "../hooks/useUiState.js";
import type { KVPair } from "../types/request.js";
import { makeField } from "./textField.js";
import { prettyBody } from "./response.js";

const responseState = useResponseState()
const requestState  = useRequestState()
const uiState = useUiState();

export function buildUrl(base: string, params: KVPair[]): string {
  const active = params.filter(p => p.key.trim());
  if (!active.length) return base;
  const qs = active.map(p =>
    `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`
  ).join("&");
  return base.includes("?") ? `${base}&${qs}` : `${base}?${qs}`;
}

export const cycleMethod = (dir: 1 | -1) => {
  const i = METHODS.indexOf(requestState.method);
  requestState.setMethod(METHODS[(i + dir + METHODS.length) % METHODS.length]!);
};

export const autoHeaders: KVPair[] = [
  { key: "Accept", value: "application/json" },
  ...(!["GET", "HEAD"].includes(requestState.method) && requestState.bodyField.value.trim()
    ? [{ key: "Content-Type", value: "application/json" }]
    : []),
];

export const sendRequest = async () => {
  responseState.setLoading(true);
  responseState.setResponse(null);
  responseState.setRespScroll(0);

  const builtHeaders: Record<string, string> = {};
  autoHeaders.forEach(h => { builtHeaders[h.key] = h.value; });
  requestState.reqHeaders.forEach(h => { if (h.key.trim()) builtHeaders[h.key] = h.value; });

  const result = await executeRequest({
    method: requestState.method,
    url: buildUrl(requestState.urlField.value, requestState.params),
    headers: builtHeaders,
    ...(!["GET", "HEAD"].includes(requestState.method) && requestState.bodyField.value.trim()
      ? { body: requestState.bodyField.value }
      : {}),
  });

  responseState.setResponse(result);
  responseState.setLoading(false);
};

export const commitDraft = (target: "params" | "req-headers") => {
  if (uiState.draftKey.value.trim()) {
    const entry: KVPair = { key: uiState.draftKey.value, value: uiState.draftValue.value };
    if (target === "params") requestState.setParams(p => [...p, entry]);
    else requestState.setReqHeaders(h => [...h, entry]);
  }
  uiState.setDraftKey(makeField());
  uiState.setDraftValue(makeField());
  uiState.setEditMode("none");
};

export const deleteRow = (target: "params" | "req-headers") => {
  if (target === "params") {
    if (!requestState.params.length) return;
    requestState.setParams(p => p.filter((_, i) => i !== uiState.kvCursor));
  } else {
    if (!requestState.reqHeaders.length) return;
    requestState.setReqHeaders(h => h.filter((_, i) => i !== uiState.kvCursor));
  }
  uiState.setKvCursor(c => Math.max(0, c - 1));
};

export const copyResponse = async () => {
  if (!responseState.response || "error" in responseState.response) return;
  try {
    await clipboard.write(prettyBody(responseState.response.body));
    responseState.setCopied(true);
    setTimeout(() => responseState.setCopied(false), 1500);
  } catch { /* ignore */ }
};