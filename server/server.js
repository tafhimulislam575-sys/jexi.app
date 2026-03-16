import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Jexi running on port ${PORT}`);
});