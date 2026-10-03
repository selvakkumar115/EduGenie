
// EduGenie API client
// The Gemini API key stays safely on the FastAPI backend.
// The frontend only communicates with the deployed backend.

export const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ||
  "https://edugenie-backend-l1u1.onrender.com";

export type Endpoint =
  | "ask"
  | "quiz"
  | "summarize"
  | "explain"
  | "recommend";

type ApiResponse = unknown;

function extractText(data: ApiResponse): string {
  // Backend returned plain text
  if (typeof data === "string") {
    return data;
  }

  // Backend returned an object
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    const possibleFields = [
      "answer",
      "response",
      "result",
      "quiz",
      "summary",
      "explanation",
      "recommendation",
      "plan",
      "text",
      "output",
      "message",
    ];

    for (const field of possibleFields) {
      const value = obj[field];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    // If none of the expected fields exist,
    // return the first string value found.
    for (const value of Object.values(obj)) {
      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }
  }

  // Last fallback
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export async function callApi(
  endpoint: Endpoint,
  params: Record<string, string>
): Promise<string> {
  const query = new URLSearchParams();

  // Add only valid parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  const url = `${API_BASE}/${endpoint}?${query.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) {
      let errorMessage = `Request failed with HTTP ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData && typeof errorData === "object") {
          const errorObject = errorData as Record<string, unknown>;

          if (typeof errorObject.detail === "string") {
            errorMessage = errorObject.detail;
          } else if (typeof errorObject.message === "string") {
            errorMessage = errorObject.message;
          }
        }
      } catch {
        // Ignore JSON parsing errors
      }

      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return extractText(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to connect to the EduGenie backend.");
  }
}

// -----------------------------
// Question Answering
// -----------------------------

export async function askQuestion(question: string): Promise<string> {
  return callApi("ask", {
    question,
  });
}

// -----------------------------
// Quiz Generation
// -----------------------------

export async function generateQuiz(topic: string): Promise<string> {
  return callApi("quiz", {
    topic,
  });
}

// -----------------------------
// Summarization
// -----------------------------

export async function summarizeText(text: string): Promise<string> {
  return callApi("summarize", {
    text,
  });
}

// -----------------------------
// Concept Explanation
// -----------------------------

export async function explainTopic(topic: string): Promise<string> {
  return callApi("explain", {
    topic,
  });
}

// -----------------------------
// Learning Recommendation
// -----------------------------

export async function getRecommendation(
  subject: string,
  level: string
): Promise<string> {
  return callApi("recommend", {
    subject,
    level,
  });
}

