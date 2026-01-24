import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ===== Supabase Config =====
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant Bot is running");
});

// ===== Webhook Route =====
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    const { error } = await supabase
      .from("YOUR_TABLE_NAME") // 👈 حطي اسم الجدول هنا
      .insert([
        {
          payload: data,
          created_at: new Date()
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ success: false, error });
    }

    res.status(200).json({ success: true, message: "Webhook received" });
