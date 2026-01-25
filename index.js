import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

// Middlewares
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

// Webhook Endpoint (FIXED)
app.post("/webhook", async (req, res) => {
  // ✅ رد فوري لسلة
  res.status(200).send("OK");

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
    }

  } catch (err) {
    console.error("Webhook Processing Error:", err);
  }
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});