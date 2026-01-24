import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// Supabase Config
// ==========================
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================
// Health Check
// ==========================
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant AI is running");
});

// ==========================
// Webhook Endpoint
// ==========================
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
      return res.status(500).json({ error: "DB insert failed", details: error });
    }

    return res.status(200).json({
      success: true,
      inserted: data
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Server crashed", details: err });
  }
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 RB Accountant AI running on port ${PORT}`);
});
