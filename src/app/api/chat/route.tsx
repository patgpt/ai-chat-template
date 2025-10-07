import { convertToModelMessages, streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const modelMesages = convertToModelMessages(messages);

  const response = await streamText({
    model: "google/gemini-2.5-flash",
    messages: modelMesages,
  });

  return response.toUIMessageStreamResponse();
}
