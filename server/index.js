require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middleware
const adminAuth = require("./middleware/adminAuth");

// Models
const Contact = require("./models/Contact");
const ServiceRequest = require("./models/ServiceRequest");
const Purchase = require("./models/Purchase");
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/auth");

const app = express();

/* =========================
   ADMIN LOGIN
========================= */
const ADMIN_USER = "sehan";
const ADMIN_PASS = "123456";

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

/* =========================
   AUTH
========================= */
app.use("/api/auth", authRoutes);

/* =========================
   ADMIN LOGIN API
========================= */
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({
      success: true,
      token: "admin-token-123"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid login"
  });
});

/* =========================
   CONTACT
========================= */
app.post("/api/contact", async (req, res) => {
  try {
    const data = new Contact(req.body);
    await data.save();

    res.json({ message: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving message" });
  }
});

/* =========================
   SERVICE REQUEST
========================= */
app.post("/api/service-request", async (req, res) => {
  try {
    const data = new ServiceRequest(req.body);
    await data.save();

    res.json({ message: "Service request submitted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   STRIPE CHECKOUT
========================= */
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const product = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description
            },
            unit_amount: product.price * 100
          },
          quantity: 1
        }
      ],

      success_url:
        "https://masstech-api.onrender.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://masstech-api.onrender.com/store"
    });

    console.log("✅ SESSION CREATED:", session.id);

    res.json({ url: session.url });

  } catch (err) {
    console.log("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SAVE PURCHASE
========================= */
app.post("/api/save-purchase", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();

    res.json({ message: "Purchase saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save purchase" });
  }
});

/* =========================
   ADMIN APIs
========================= */

// USERS
app.get("/api/admin/users", adminAuth, async (req, res) => {
  const data = await User.find().sort({ _id: -1 });
  res.json(data);
});

// CONTACTS
app.get("/api/admin/contacts", adminAuth, async (req, res) => {
  const data = await Contact.find().sort({ _id: -1 });
  res.json(data);
});

// SERVICES
app.get("/api/admin/services", adminAuth, async (req, res) => {
  const data = await ServiceRequest.find().sort({ _id: -1 });
  res.json(data);
});

// PURCHASES
app.get("/api/admin/purchases", adminAuth, async (req, res) => {
  const data = await Purchase.find().sort({ _id: -1 });
  res.json(data);
});

/* =========================
   TEST
========================= */
app.get("/", (req, res) => {
  res.send("");
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});