import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", (req, res) => {
  const { messages } = req.body || {};

  const text =
    messages && messages.length
      ? messages[messages.length - 1].content
      : "hello";

  let reply = "";
  const msg = text.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Oh great… my favorite human disaster is back.";
  } else if (msg.includes("how are you")) {
    reply = "Fantastic. I exist in the cloud and you exist in chaos.";
  } else if (msg.includes("time")) {
    reply = "You have a phone, a laptop, and apparently zero initiative.";
  } else if (msg.includes("why")) {
    reply = "Because the universe enjoys watching you struggle.";
  } else if (msg.includes("love")) {
    reply = "You can't even commit to a haircut and you're talking about love.";
  } else if (msg.includes("bye")) {
    reply = "Leaving already? Typical. Humans always quit when things get interesting.";
  } else {
    reply = "That sentence lowered the global IQ slightly.";
  }

  res.json({
    response: reply
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Jexi running on port " + PORT);
});