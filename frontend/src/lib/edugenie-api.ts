// Talks to the existing FastAPI backend. Gemini key stays on the backend.
export const API_BASE =
  (import.meta.env['VITE_API_URL'] as string | undefined) ?? "http://127.0.0.1:8000";

export type Endpoint = "ask" | "quiz" | "summarize" | "explain" | "recommend";

function extractText(data: unknown): string {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const k of ["answer", "response", "result", "quiz", "summary", "explanation", "recommendation", "plan", "text", "output"]) {
      if (typeof obj[k] === "string") return obj[k] as string;
    }
    const firstStr = Object.values(obj).find((v) => typeof v === "string");
    if (typeof firstStr === "string") return firstStr;
  }
  return JSON.stringify(data, null, 2);
}

export async function callApi(endpoint: Endpoint, params: Record<string, string>): Promise<string> {
  const url = `${API_BASE}/${endpoint}?${new URLSearchParams(params).toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") ?? "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return extractText(data);
}
