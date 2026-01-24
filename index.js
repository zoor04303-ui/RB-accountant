app.post("/webhook", async (req, res) => {
  try {
    const userMessage = req.body.message || "no message";

    const { data, error } = await supabase
      .from("rb_accountant")
      .insert([
        {
          message: userMessage,
          created_at: new Date()
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: "DB insert failed" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});
