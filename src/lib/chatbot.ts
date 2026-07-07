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

  const stream = await client.responses.create({
    model: "openai/gpt-oss-120b",
    input: messages,
    stream: true,
  });

  let assistantMessage = "";

  process.stdout.write("\nAI: ");

  for await (const event of stream) {
    switch (event.type) {
      case "response.output_text.delta":
        process.stdout.write(event.delta);
        assistantMessage += event.delta;
        break;

      default:
        // Ignore other event types
        break;
    }
  }

  process.stdout.write("\n\n");

  messages.push({
    role: "assistant",
    content: assistantMessage,
  });
}

rl.close();
console.log("Goodbye 👋");
