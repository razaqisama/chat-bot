import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 100,
    stream: true,
    prompt,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
