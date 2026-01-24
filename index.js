const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(bodyParser.json());

// ===== Supabase =====
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant AI is running!");
});

// ===== Webhook (مثال) =====
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    const { error } = await supabase
      .from("YOUR_TABLE_NAME") // ← حطي اسم الجدول
      .insert([{ payload: data }]);

    if (error) throw error;

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Error");
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 10000;

app.listen(PORT, ()
