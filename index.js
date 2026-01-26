import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();

// ===== Middleware =====
app.use(express.json());

// ===== Supabase Setup =====
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Supabase env variables missing");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ===== Health Check =====
app.get("/", (req, res) =>