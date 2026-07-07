import "dotenv/config";
import OpenAI from "openai";

export const client = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.GROQ_API_KEY,
});
