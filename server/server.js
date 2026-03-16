app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const last = messages[messages.length - 1].content;

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      inputs: last,
      parameters: {
        max_new_tokens: 120,
        temperature: 0.9
      }
    });

    let reply =
      result.generated_text ||
      "Even my AI brain is confused by that.";

    reply = reply.replace(last, "").trim();

    res.json({ response: reply });

  } catch (err) {
    console.error(err);
    res.json({ response: "Jexi had a brain malfunction." });
  }
});