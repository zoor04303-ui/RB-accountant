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

// Webhook TEST (GET)
app.get("/webhook", (req, res) => {
  res.send("Webhook endpoint is alive ✅");
});

// Webhook REAL (POST)
app.post("/webhook", async (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200
