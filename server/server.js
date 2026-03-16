import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", (req, res) => {
  const { messages } = req.body || {};
  const text = messages?.[messages.length - 1]?.content || "hello";
  res.json({
    response: `Jexi: ${text}`
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log("Jexi running on http://127.0.0.1:3000");
});
