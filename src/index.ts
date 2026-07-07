import { client } from "./lib/openai.js";

const response = await client.responses.create({
  model: "openai/gpt-oss-120b",
  // input: "Explain TypeScript in one sentence.",
  input: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: "Hello, My name is Towfeeq",
    },
    {
      role: "assistant",
      content: "Hi! How can I help?",
    },
    {
      role: "user",
      content: "What is the meaning of my name?",
    },
  ],
  // max_output_tokens: 150,
});

console.log(response.output_text);
