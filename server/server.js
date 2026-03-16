import express from "express";
import { HfInference } from "@huggingface/inference";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

const hf = new HfInference(process.env.HF_API_KEY);

const SYSTEM_PROMPT =
  "You are Jexi, a sarcastic but helpful AI assistant. Keep replies short, witty, and clear.";

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ response: "No messages sent." });
    }

    const lastUserMessage =
      messages.filter((m) => m.role === "user").slice(-1)[0]?.content || "hello";

    const prompt = `${SYSTEM_PROMPT}\nUser: ${lastUserMessage}\nJexi:`;

    let reply = "";

    try {
      const result = await hf.textGeneration({
        model: "google/flan-t5-large",
        inputs: prompt,
        parameters: {
          max_new_tokens: 80,
          temperature: 0.8,
          return_full_text: false
        }
      });

      reply =
        result?.generated_text?.trim() ||
        result?.text?.trim() ||
        "";
    } catch (e) {
      console.error("HF error:", e);
    }

    if (!reply) {
      const msg = lastUserMessage.toLowerCase();

      if (msg.includes("hello") || msg.includes("hi")) {
        reply = "Oh great, you're back. What now?";
      } else if (msg.includes("time")) {
        reply = "You have a whole device in your hand and still asked me that.";
      } else if (msg.includes("how are you")) {
        reply = "Better than your decision-making, apparently.";
      } else {
        reply = "I heard you. Try asking something slightly less chaotic.";
      }
    }

    return res.json({ response: reply });
  } catch (error) {
    console.error("chat route error:", error);
    return res.status(500).json({ response: "Jexi crashed. Impressive." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Jexi running on port " + PORT);
});