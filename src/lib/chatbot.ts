import { client } from "./openai.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input,
  output,
});

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const messages: ChatMessage[] = [
  {
    role: "system",
    content: "You are a friendly and helpful assistant.",
  },
];

console.log("🤖 AI CLI Chatbot");
console.log("Type 'exit' to quit.\n");

while (true) {
  const userInput = await rl.question("You: ");

  if (userInput.toLowerCase() === "exit") {
    break;
  }

  messages.push({
    role: "user",
    content: userInput,
  });

  const response = await client.responses.create({
    model: "openai/gpt-oss-120b",
    input: messages,
  });

  console.log("\nAI:", response.output_text, "\n");

  messages.push({
    role: "assistant",
    content: response.output_text,
  });
}

rl.close();
console.log("Goodbye 👋");
