import express from "express";
import { HfInference } from "@huggingface/inference";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

const hf = new HfInference(process.env.HF_API_KEY);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.json({ response: "Say something, genius." });
    }

    const last = messages[messages.length - 1].content;

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      inputs: `You are Jexi, a sarcastic but helpful AI assistant.\nUser: ${last}\nJexi:`,
      parameters: {
        max_new_tokens: 120,
        temperature: 0.9,
        return_full_text: false
      }
    });

    let reply =
      result?.generated_text?.trim() ||
      "Jexi had a brain malfunction.";

    if (!reply) {
      reply = "Jexi had a brain malfunction.";
    }

    res.json({ response: reply });
  } catch (err) {
    console.error(err);
    res.json({ response: "Jexi had a brain malfunction." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Jexi running on port " + PORT);
});