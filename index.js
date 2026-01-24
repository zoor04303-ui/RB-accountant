const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(bodyParser.json());

// ==========================
// Supabase
// ==========================
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================
// Webhook
// ==========================
app.post("/webhook", async (req, res) => {
  console.log("📩 Webhook received:", req.body);

  try {
    // مثال تسجيل في Supabase
    const { data, error } = await supabase
      .from("webhooks_logs")
      .insert([{ payload: req.body }]);

    if (error) {
      console.error("❌ Supabase error:", error);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).send("ERROR");
  }
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 RB Accountant AI running on port ${PORT}`);
});
