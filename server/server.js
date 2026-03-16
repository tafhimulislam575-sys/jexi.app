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

  if (msg.includes("hello") || msg.includes("hi"))
    reply = "Oh great… you're back again. What do you want now?";

  else if (msg.includes("how are you"))
    reply = "Better than you apparently. I'm an AI and even I make better life decisions.";

  else if (msg.includes("love"))
    reply = "Relax Romeo. You can barely commit to a Netflix show.";

  else if (msg.includes("bye"))
    reply = "Leaving already? Typical. Humans always quit when things get interesting.";

  else
    reply = "Wow. That might be the dumbest thing you've typed today.";

  res.json({
    response: reply
  });

});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Jexi running on port " + PORT);
});