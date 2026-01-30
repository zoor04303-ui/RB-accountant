import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Supabase =====
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant AI is running");
});

// ===== Webhook TEST =====
app.get("/webhook", (req, res) => {
  res.send("✅ Webhook endpoint is alive");
});

// ===== Webhook REAL (Salla → Render → Make) =====
app.post("/webhook", async (req, res) => {
  try {
    console.log("📦 Order received from Salla:", req.body);

    // 🔗 Send to Make
    await fetch("", {
      method: "POST",cybfhc8r2l84ayp8dnc59qx2c0u4udpl@hook.us2.make.com
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    res.status(200).send("ok");
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).send("error");
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
