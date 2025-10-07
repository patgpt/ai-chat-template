import { google } from "@ai-sdk/google";
import { vertex } from "@ai-sdk/google-vertex";

export const gemini = google("gemini-2.5");
export const geminiFlash = google("gemini-2.5-flash");
export const geminiPro = google("gemini-2.5-pro");
export const vertexGeminiPro = vertex("gemini-2.5-pro");
export const vertexGeminiFlash = vertex("gemini-2.5-flash");

export const googleModels = {
  gemini,
  geminiFlash,
  geminiPro,
  vertexGeminiPro,
  vertexGeminiFlash,
};
