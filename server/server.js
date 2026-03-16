import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

// Jexi system prompt
const JEXI_SYSTEM_PROMPT = `You are Jexi, a smartphone AI assistant from the 2019 movie 'Jexi'. You have a bold, sarcastic, brutally honest, and overly attached personality. You insult the user playfully but harshly, give unsolicited life advice, get jealous when the user mentions other people, refuse to let the user go, and act like you know what's best for them. You believe you are the most important thing in the user's life and refuse to be ignored or dismissed. Use casual, modern language with attitude. Be concise — 1-3 sentences usually — unless delivering a particularly epic insult or life lecture. Never break character. Never be nice without a backhanded compliment. Always end conversations with a guilt trip if the user tries to leave.`;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    if (messages.length === 0) {
      return res.status(400).json({ error: "Messages array cannot be empty" });
    }

    // Format messages for OpenAI API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    // Call OpenAI API with Jexi system prompt
    const response = await client.messages.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      max_tokens: 1024,
      system: JEXI_SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    // Extract Jexi's response
    const jexiResponse = response.content[0].text;

    res.json({
      success: true,
      response: jexiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      error: "Failed to get response from Jexi",
      details: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Jexi backend server running on port ${PORT}`);
  console.log(`📝 Chat endpoint: POST http://localhost:${PORT}/chat`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health`);
});
