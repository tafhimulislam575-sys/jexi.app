const result = await hf.textGeneration({
  model: "google/flan-t5-large",
  inputs: `Answer this like a sarcastic assistant named Jexi: ${last}`,
  parameters: {
    max_new_tokens: 80,
    temperature: 0.7
  }
});

let reply = result?.generated_text?.trim();

if (!reply) {
  reply = "My brain lagged. Ask again.";
}