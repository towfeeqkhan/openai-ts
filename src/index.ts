import { client } from "./lib/openai.js";

const response = await client.responses.create({
  model: "openai/gpt-oss-120b",
  input: "Explain TypeScript in one sentence.",
  max_output_tokens: 150,
});

console.log(response.output_text);
