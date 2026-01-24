import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(bodyParser.json());

// ======================
// Supabase Config
// ======================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ======================
// Health Check
// ======================
app.get("/", (req, res) => {
  res.send("🚀 RB Accountant AI is running!");
});

// ======================
// Webhook from Salla
// ======================
app.post("/webhook", async (req, res) => {
  try {
    const event = req.body;
    console.log("📩 Salla Event Received:", event);

    // مثال: طلب جديد
    if (event.event === "order.created") {
      const order = event.data;

      const orderData = {
        order_id: order.id,
        total: order.total.amount,
        currency: order.total.currency,
        status: order.status,
        customer_name: order.customer?.name || null,
        created_at: order.created_at
      };

      // حفظ في Supabase
      const { error } = await supabase
        .from("orders")
        .insert([orderData]);

      if (error) {
        console.error("❌ Supabase Insert Error:", error);
      } else {
        console.log("✅ Order saved to Supabase:", order.id);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("🔥 Webhook Error:", err);
    res.sendStatus(500);
  }
});

// ======================
// Simple Analytics Endpoint
// ======================
app.get("/analytics/summary", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("total");

    if (error) throw error;

    const totalSales = data.reduce((sum, o) => sum + Number(o.total), 0);

    res.json({
      total_orders: data.length,
      total_sales: totalSales
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ error: "Failed to load analytics" });
  }
});

// ======================
// Server
// ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ RB Accountant AI running on port ${PORT}`);
});process.env.PORT
