import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Config
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant AI is running");
});

// Webhook Endpoint
app.post("/webhook", async (req, res) => {
  try {
    console.log("Webhook received:", req.body);

    const payload = JSON.stringify(req.body);

    const { error } = await supabase
      .from("rb_accountant")
      .insert([
        {
          message: payload,
          created_at: new Date()
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).send("DB Error");
    }

    res.status(200).send("OK");

  } catch (err) {
    console.error("Webhook Crash:", err);
    res.status(500).send("Server Error");
  }
});

// 🔥 THIS IS REQUIRED FOR RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
